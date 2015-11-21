'use strict';

module.exports = function (gulp, config) {
	gulp.task( 'requirejs', function ( cb ) {
		var rjs = require('requirejs');

		var config = {
			mainConfigFile: 'dist/modules/config.js',
			baseUrl: 'dist/modules/',
			dir: 'dist/modules/',
			//include: ['main'],
			optimize: "none",
			optimizeCss: "none",
			findNestedDependencies: true,
			wrapShim: true,
			allowSourceOverwrites: true,
			keepBuildDir: true
		};

		rjs.optimize( config, function( buildResponse ) {
			cb();
		}, cb );
	});
};
