import test from 'ava';

global.FormData = require('form-data');
require('../../lib/index');


test('Function send2server() exists', (t) => {
	t.truthy(send2server);
});

test('Test FormData support', (t) => {
	t.truthy(FormData);
});
