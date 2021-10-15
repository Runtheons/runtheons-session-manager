const jwt = require("jsonwebtoken");
const key = "RUNTHEONS";

module.exports = class SessionManager {

	option = {
		expiresIn: "2 days"
	};

	setOption(option) {
		this.option = option;
	}

	generateToken(data) {
		var token = jwt.sign({ data }, key, this.option);
		return token;
	}

	extractData(token) {
		if (token == null)
			return {};

		try {
			var data = jwt.verify(token, key);
			return data.data;
		} catch (err) {
			return undefined;
		}
	}
};