const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const ENCRYPTION_ALGORITHM = 'aes256';
const ENCRYPTION_INPUT_ENCODING = 'utf-8';
const ENCRYPTION_OUTPUT_ENCODING = 'hex';
const IV = 'RUNTHEONS-IV-16B';

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
		if (Buffer.from(SessionManager.key).length != 32) {
			throw new Error('Please set SessionManager key must be 32');
		}
		var token = jwt.sign({ data }, SessionManager.JWTkey, this.option);

		var cipher = crypto.createCipheriv(
			ENCRYPTION_ALGORITHM,
			Buffer.from(SessionManager.key),
			IV
		);
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
		if (Buffer.from(SessionManager.key).length != 32) {
			throw new Error('Please set SessionManager key must be 32');
		}
		try {
			var decipher = crypto.createDecipheriv(
				ENCRYPTION_ALGORITHM,
				Buffer.from(SessionManager.key),
				IV
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