# runtheons-session-manager

This reposity manage the session of Runtheons BackEnd

# Usage
- [getData](https://github.com/Zexal0807/runtheons-session-managerp#getData "getData")
- [createSession](https://github.com/Zexal0807/runtheons-session-managerp#createSession "createSession")

## getData

```js
Object getData(String token)
```
It receive a Express.Request Return an a object contains the session data, if no session were fount return an empty object

## createSession

```js
String createSession(Object data)
```
It receive the data to store in session, Return an access Token 