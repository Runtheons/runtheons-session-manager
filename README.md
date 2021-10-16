# Runtheons Session Manager

This reposity manage the session of Runtheons BackEnd

# Getting started

## Prerequisites

1. Git
2. Node: any 14.x version starting with v14.5.0 or greater

## Installation

1. `npm install https://github.com/Zexal0807/runtheons-session-manager` to add the package to the project

# Usage

Set the key

```javascript
require('@runtheons/session-manager/SessionManager').setJWTKey(
	'SECRET-RUNTHEONS-JWT'
);
require('@runtheons/session-manager/SessionManager').setKey(
	'SECRET-RUNTHEONS-KEY-THAT-IS-32B'
);
```

After set the key, there're two method:

- [generateToken](https://github.com/Zexal0807/runtheons-session-manager#generateToken 'generateToken')
- [extractData](https://github.com/Zexal0807/runtheons-session-manager#extractData 'extractData')

## generateToken

```javascript
const SessionManager = require('@runtheons/session-manager')

String generateToken(Object data)
```

It receive a JWT token string Return an a object contains the session data, if no session were fount return undefined

### Example

```javascript
const SessionManager = require('@runtheons/session-manager');

const data = {
	idUser: 1
};

var token = SessionManager.generateToken(data);
```

## extractData

```javascript
const SessionManager = require('@runtheons/session-manager')

Object extractData(String token)
```

It receive the data to store in session, Return a JWT token string

### Example

```javascript
const SessionManager = require('@runtheons/session-manager');

const token = 'abc....';

var data = SessionManager.extractData(token);
```
