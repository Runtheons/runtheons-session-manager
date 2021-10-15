const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const ENCRYPTION_ALGORITHM = 'aes256';
const ENCRYPTION_INPUT_ENCODING = 'utf-8';
const ENCRYPTION_OUTPUT_ENCODING = 'hex';

module.exports = class SessionManager {
	static JWTkey = null;

	static key = null;

	static setJWTKey(JWTkey) {
		this.JWTkey = JWTkey;
	}

	static setKey(key) {
		this.key = key;
	}

	option = {
		expiresIn: '2 days'
	};

	setOption(option) {
		this.option = option;
	}

	generateToken(data) {
		if (SessionManager.JWTkey == null || SessionManager.key == null) {
			throw new Error('Please set SessionManager JWTkey and key');
		}
		var token = jwt.sign({ data }, SessionManager.JWTkey, this.option);
		var cipher = crypto.createCipher(ENCRYPTION_ALGORITHM, SessionManager.key);
		var encrypted = cipher.update(
			token,
			ENCRYPTION_INPUT_ENCODING,
			ENCRYPTION_OUTPUT_ENCODING
		);
		encrypted += cipher.final(ENCRYPTION_OUTPUT_ENCODING);
		return encrypted;
	}

	extractData(token) {
		if (token == null) return {};

		if (SessionManager.JWTkey == null || SessionManager.key == null) {
			throw new Error('Please set SessionManager JWTkey and key');
		}
		try {
			var decipher = crypto.createDecipher(
				ENCRYPTION_ALGORITHM,
				SessionManager.key
			);
			var decrypted = decipher.update(
				token,
				ENCRYPTION_OUTPUT_ENCODING,
				ENCRYPTION_INPUT_ENCODING
			);
			decrypted += decipher.final(ENCRYPTION_INPUT_ENCODING);
			var data = jwt.verify(decrypted, SessionManager.JWTkey);
			return data.data;
		} catch (err) {
			return undefined;
		}
	}
};