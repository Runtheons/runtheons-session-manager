const assert = require('assert');

var data = {
	test: 'Test'
};

describe('Encryption', function() {
	test('Without set key no data', async() => {
		const SessionManager = require('./../index');
		var throwed = false;
		try {
			const result = SessionManager.generateToken(data);
		} catch (e) {
			throwed = true;
		}
		assert.equal(throwed, true);
	});
	test('Example', async() => {
		require('./../SessionManager').setJWTKey('SECRET-RUNTHEONS-JWT');
		require('./../SessionManager').setKey('SECRET-RUNTHEONS-KEY-THAT-IS-32B');
		const SessionManager = require('./../index');
		const result = SessionManager.generateToken(data);
		assert.equal(typeof result, 'string');
	});
});

describe('Decryption', function() {
	test('Example', async() => {
		require('./../SessionManager').setJWTKey('SECRET-RUNTHEONS-JWT');
		require('./../SessionManager').setKey('SECRET-RUNTHEONS-KEY-THAT-IS-32B');
		const SessionManager = require('./../index');
		const token = SessionManager.generateToken(data);
		const result = SessionManager.extractData(token);

		assert.deepEqual(result, data);
	});
});