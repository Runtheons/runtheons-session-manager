const jwt = require('jsonwebtoken');

module.exports = class SessionManager {
	static key = null;

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
		if (SessionManager.key == null) {
			throw new Error('Please set SessionManager key');
		}
		var token = jwt.sign({ data }, SessionManager.key, this.option);
		return token;
	}

	extractData(token) {
		if (token == null) return {};

		try {
			var data = jwt.verify(token, SessionManager.key);
			return data.data;
		} catch (err) {
			return undefined;
		}
	}
};