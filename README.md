# runtheons-session-manager

This reposity manage the session of Runtheons BackEnd

# Usage
- [generateToken](https://github.com/Zexal0807/runtheons-session-manager#generateToken "generateToken")
- [extractData](https://github.com/Zexal0807/runtheons-session-manager#extractData "extractData")

## generateToken

```js
Object generateToken(String token)
```
It receive a Express.Request Return an a object contains the session data, if no session were fount return an empty object

## extractData

```js
String extractData(Object data)
```
It receive the data to store in session, Return an access Token 