'use strict';

module.exports = function (gulp, config) {

	gulp.task('build-dev', function (callback) {
		var runSequence = require('run-sequence').use(gulp);

		runSequence(
			['sync', 'sass'],
			'babel',
			callback
		);
	});

	gulp.task('build-useref', function () {
		var useref = require('gulp-useref');
		var filter = require('gulp-filter');
		var assets = useref.assets({searchPath: ['.', 'dist']});
		var cssFilter = filter(['**/*.css']);
		var jsFilter = filter('**/*.js');
		var cache = require('gulp-cached');
		var minifyCss = require('gulp-minify-css');
		var uglify = require('gulp-uglify');
		var remember = require('gulp-remember');
		var sourcemaps = require('gulp-sourcemaps');
		var gulpIf = require('gulp-if');
		return gulp
			.src(config.build.src)
			//.pipe($.print())
			.pipe(assets)
			//.pipe($.print())
			.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(cache('compile-assets'))
			.pipe(gulpIf('*.css', minifyCss()))
			.pipe(gulpIf('*.js', uglify()))
			//.pipe(cssFilter)
			//.pipe(remember('styles'))
			////.pipe($.print())
			//.pipe($.minifyCss())
			//.pipe(cssFilter.restore())
			//.pipe(jsFilter)
			////.pipe($.print())
			//.pipe(remember('scripts'))
			//.pipe($.uglify())
			//.pipe(jsFilter.restore())
			.pipe(assets.restore())
			.pipe(remember('compile-assets'))
			//.pipe($.print())
			.pipe(useref())
			.pipe(sourcemaps.write(config.build.maps))
			.pipe(gulp.dest(config.paths.destination));
	});

	gulp.task('build-modules', function () {
		var useref = require('gulp-useref');
		var filter = require('gulp-filter');
		var cache = require('gulp-cached');
		var uglify = require('gulp-uglify');
		var remember = require('gulp-remember');
		var sourcemaps = require('gulp-sourcemaps');
		var gulpIf = require('gulp-if');

		return gulp
			.src(config.paths.destination + 'modules/**/*.js')
			.pipe(cache('modules'))
			.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(gulpIf('*.js', uglify()))
			.pipe(remember('modules'))
			.pipe(sourcemaps.write(config.build.maps))
			.pipe(gulp.dest(config.paths.destination + 'modules/'));
	});

	gulp.task('build-prod', function (callback) {

		var runSequence = require('run-sequence').use(gulp);

		runSequence(
			['sync', 'sass'],
			'babel',
			[
				'build-modules',
				'build-useref'
			],
			'requirejs',
			callback
		);
	});

	gulp.task('build-test', function (callback) {

		var runSequence = require('run-sequence').use(gulp);

		runSequence(
			[
				'build-dev'
			],
			[
				'test',
				'vet'
			],
			callback
		);
	});

	gulp.task('sync', function (callback) {
		var dirSync = require( 'gulp-directory-sync' );
		return gulp.src( '' )
			.pipe(dirSync( config.paths.www, config.paths.destination, {
				printSummary: true,
				ignore: [ /.*\.min\.css$/, /.*\.map/ ]
			} ))
	});

	gulp.task('sync-rebuild', function (callback) {
		var dirSync = require( 'gulp-directory-sync' );
		return gulp.src( '' )
			.pipe(dirSync( config.paths.www, config.paths.destination, {
				printSummary: true,
				ignore: []
			} ))
	});

	var watchedFiles = [
		config.paths.www + '**/*'
	];

	gulp.task('watch-build-dev', ['build-dev'], function () {
		var runSequence = require('run-sequence').use(gulp);
		var watch = require('gulp-watch');

		watch(watchedFiles, function(file){
			runSequence(
				['build-dev']
			);
		});

		return gulp;
	});
	gulp.task('watch-build-test', ['build-test'], function () {
		var runSequence = require('run-sequence').use(gulp);
		var watch = require('gulp-watch');

		watch(watchedFiles, function(file){
			runSequence(
				['build-test']
			);
		});

		return gulp;
	});
	gulp.task('watch-build-prod', ['build-prod'], function () {
		var runSequence = require('run-sequence').use(gulp);
		var watch = require('gulp-watch');

		watch(watchedFiles, function(file){
			runSequence(
				['build-prod']
			);
		});

		return gulp;
	});

};
