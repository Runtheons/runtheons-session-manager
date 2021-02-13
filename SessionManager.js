const jwt = require("jsonwebtoken");
const key = "RUNTHEONS";

module.exports = new class SessionManager {

	generateToken(data) {
		var token = jwt.sign({ data },
			key, {
				expiresIn: "2 days"
			}
		);
		return token;
	}

	extractData(token) {
		if (token == null)
			return {};

		try {
			var data = jwt.verify(token, key);
			return data;
		} catch (err) {
			return undefined;
		}
	}
}