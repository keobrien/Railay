'use strict';

module.exports = function (gulp, config) {
	gulp.task('sass', function (callback) {

		var minifyCss = require('gulp-minify-css');
		var sass = require('gulp-sass');
		var sourcemaps = require('gulp-sourcemaps');
		var remember = require('gulp-remember');
		var rename = require('gulp-rename');

		return gulp.src(config.sass.sourceFiles)
			//.pipe($.print())
			.pipe(sourcemaps.init())
			//.pipe($.newer(config.sass.destination))
			.pipe(sass().on('error', sass.logError))
			//.pipe(remember('compile-sass'))
			.pipe(minifyCss())
			.pipe(rename({
				suffix: '.min'
			}))
			.pipe(sourcemaps.write(config.sass.maps))
			.pipe(gulp.dest(config.sass.destination));
	});

};
