module.exports = new class SessionManager {

    createSession(res = null) {
        return session;
    }

    getData(req) {
        return { id: 1 };
    }

}