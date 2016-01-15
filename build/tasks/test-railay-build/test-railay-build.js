'use strict';

module.exports = function (gulp, config) {
	gulp.task('test-railay-build-sync', function (callback) {
		var dirSync = require( 'gulp-directory-sync' );
		return gulp.src( '' )
			.pipe(dirSync( config.railay.sync.sourceFiles, config.railay.sync.destination, {
				printSummary: true,
				nodelete: true,
				ignore: []
			} ))
	});

	gulp.task('test-railay-build', function (callback) {
		var runSequence = require('run-sequence').use(gulp);

		runSequence(
			'sync',
			'test-railay-bower',
			'test-railay-build-sync',
			'sass',
			'babel',
			[ 'test', 'vet' ],
			'serve',
			callback
		);
	});

	gulp.task('test-railay-bower', function() {

		var gulp = require('gulp');
		var bower = require('gulp-bower');

		return bower({ cwd: config.railay.bower });
	});
};
