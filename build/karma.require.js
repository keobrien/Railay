'use strict';

var tests = [];
for (var file in window.__karma__.files) {
	console.info(file);
	if (window.__karma__.files.hasOwnProperty(file)) {
		if (/spec\.js$/.test(file)) {
			file = file.replace(/^\/__karma__\/base\/dist\/modules\//, '').replace(/\.js$/, '');
			tests.push(file);
		}
	}
}
console.info(['Tests', tests]);

requirejs.config({
	// Karma serves files from '/base'
	baseUrl: '/__karma__/base/dist/modules',

	// ask Require.js to load these files (all our tests)
	deps: [].concat(
		tests,
		'main'
	),

	// start test run, once Require.js is done
	callback: window.__karma__.start
});
