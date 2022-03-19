const assert = require('assert');

var data = {
	test: 'Test'
};

describe('Encryption', function() {
	beforeEach(() => {
		jest.resetModules();
	});

	it('Without set JWTkey no data', async() => {
		const SessionManager = require('./../index');

		expect(() => {
			const result = SessionManager.generateToken(data);
		}).toThrow();
	});

	it('Without set key no data', async() => {
		const SessionManager = require('./../index');
		require('./../SessionManager').setJWTKey('SECRET-RUNTHEONS-JWT');
		expect(() => {
			const result = SessionManager.generateToken(data);
		}).toThrow();
	});

	it('With key length not equals to 32', async() => {
		const SessionManager = require('./../index');
		require('./../SessionManager').setJWTKey('SECRET-RUNTHEONS-JWT');
		require('./../SessionManager').setKey(
			'SECRET-RUNTHEONS-KEY-THAT-IS-NOT-32B'
		);
		expect(() => {
			const result = SessionManager.generateToken(data);
		}).toThrow();
	});

	it('Example', async() => {
		require('./../SessionManager').setJWTKey('SECRET-RUNTHEONS-JWT');
		require('./../SessionManager').setKey('SECRET-RUNTHEONS-KEY-THAT-IS-32B');
		const SessionManager = require('./../index');
		const result = SessionManager.generateToken(data);
		assert.equal(typeof result, 'string');
	});

	it('Example with custom expiressIn', async() => {
		require('./../SessionManager').setJWTKey('SECRET-RUNTHEONS-JWT');
		require('./../SessionManager').setKey('SECRET-RUNTHEONS-KEY-THAT-IS-32B');
		const SessionManager = require('./../index');
		SessionManager.setOption({ expiresIn: '10 days' });
		const result = SessionManager.generateToken(data);
		assert.equal(typeof result, 'string');
	});
});

describe('Decryption', function() {
	beforeEach(() => {
		jest.resetModules();
	});

	it('Without set JWTkey no data', async() => {
		const SessionManager = require('./../index');

		expect(() => {
			const result = SessionManager.extractData('TOKEN');
		}).toThrow();
	});

	it('With key length not equals to 32', async() => {
		const SessionManager = require('./../index');
		require('./../SessionManager').setJWTKey('SECRET-RUNTHEONS-JWT');
		require('./../SessionManager').setKey(
			'SECRET-RUNTHEONS-KEY-THAT-IS-NOT-32B'
		);
		expect(() => {
			const result = SessionManager.extractData('');
		}).toThrow();
	});

	it('With undefined token', async() => {
		const SessionManager = require('./../index');

		const result = SessionManager.extractData(undefined);

		expect(result).toEqual({});
	});

	it('With incorrect token', async() => {
		const SessionManager = require('./../index');

		require('./../SessionManager').setJWTKey('SECRET-RUNTHEONS-JWT');
		require('./../SessionManager').setKey('SECRET-RUNTHEONS-KEY-THAT-IS-32B');
		const result = SessionManager.extractData('TOKEN');
		expect(result).toBe(undefined);
	});

	it('Example', async() => {
		require('./../SessionManager').setJWTKey('SECRET-RUNTHEONS-JWT');
		require('./../SessionManager').setKey('SECRET-RUNTHEONS-KEY-THAT-IS-32B');
		const SessionManager = require('./../index');
		const token = SessionManager.generateToken(data);
		const result = SessionManager.extractData(token);

		assert.deepEqual(result, data);
	});
});