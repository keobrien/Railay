'use strict';

module.exports = function (gulp, config) {

	var sourcemaps = require('gulp-sourcemaps');
	var babel = require('gulp-babel');

	gulp.task('babel', function () {
		return gulp.src(config.js.transpile.sourceFiles)
			.pipe(sourcemaps.init())
			.pipe(babel())
			.pipe(sourcemaps.write(config.js.transpile.maps))
			.pipe(gulp.dest(config.js.transpile.destination));
	});

};
