const jwt = require("jsonwebtoken");
const key = "RUNTHEONS";

module.exports = new class SessionManager {

    createSession(data, res) {
        var token = jwt.sign(
            data,
            key, {
                expiresIn: "2 days"
            }
        );
        return token;
    }

    getData(token) {
        if (token == null)
            return {};

        try {
            var data = jwt.verify(token, key);
            return data;
        } catch (err) {
            console.log(err);
            return {};
        }
    }

}