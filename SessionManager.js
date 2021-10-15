const jwt = require('jsonwebtoken');
const crypto = require('crypto');

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
		if (SessionManager.JWTkey == null) {
			throw new Error('Please set SessionManager JWTkey');
		}
		var token = jwt.sign({ data }, SessionManager.JWTkey, this.option);
		return token;
	}

	extractData(token) {
		if (token == null) return {};

		try {
			var data = jwt.verify(token, SessionManager.JWTkey);
			return data.data;
		} catch (err) {
			return undefined;
		}
	}
};