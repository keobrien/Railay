'use strict';

module.exports = function (environment) {

	var base    = __dirname + '/../';
	var config = {};

	config.paths = {
		base: base,
		build: base + 'build/',
		www: base + 'www/',
		destination: base + 'dist/',
		server: base + 'server/',
		report: base + 'reports/',
		webIndex: 'index.swig',
		maps: '.'
	};

	config.amd = {
		bowerAMD: ['requirejs'],
		main: 'modules/main.js',
		baseUrl: 'modules',
		maps: config.paths.maps,
		destination: config.paths.destination
	};

	config.bower = {
		bowerJson : require(base + 'bower.json'),
		directory : config.paths.www + 'bower_components/',
		distDir   : config.paths.destination + 'bower_components/',
		ignorePath: '',
		exclude: [].concat(
			config.amd.bowerAMD
		)
	};

	config.js = {
		sourceFiles: '**/*.js'
	};

	config.es6 = {
		sourceFiles: '**/*.es6*.js',
		maps: config.paths.maps,
		destination: config.paths.destination
	};

	config.node = {
		sourceFiles: '**/*.node.js'
	};

	config.sass = {
		sourceFiles: '**/*.scss',
		maps: config.paths.maps,
		destination: config.paths.destination
	};

	config.serve = {
		index: config.paths.server + 'server.js',
		watch: config.paths.server
	};

	config.swig = {
		sourceFiles: '**/*.swig'
	};

	config.build = {
		src: config.paths.destination + config.swig.sourceFiles,
		maps: config.paths.maps
	};

	config.vet = {
		js: {
			sourceFiles: [
				config.paths.www + '**/*.js',
				'!' + config.bower.directory + '**/*.js'
				//, config.paths.base + 'tasks/**/*.js',
				//, config.paths.server + '**/*.js'
			]
		}
	};

	switch (environment) {
		case 'production':
			config.server = {
				port    : 3000,
				www_root: 'dist'
			};
			break;
		default:
			config.server = {
				port    : 3000,
				www_root: 'dist'
			};
			break;
	}

	/**
	 * karma settings
	 */
	config.karma = {
		config: config.paths.build + 'karma.conf.js',
		exclude: [].concat(
			config.paths.destination + 'modules/bower/**'
		),
		sourceFiles: [].concat(
			config.paths.destination + '!(bower_components|modules)/**/!(*.spec)+(.js)',
			{pattern: config.bower.distDir + '**/!(*.spec)+(.js)', included: false},
			{pattern: config.paths.destination + 'modules/**/*.js', included: false},
			config.paths.build + 'karma.require.js',
			config.paths.destination + 'modules/config.js'
		),
		coverageFiles: config.paths.destination + '!(bower_components)/**/!(*.spec)+(.js)'
	};
	config.karma.options = getKarmaOptions();

	return config;

	////////////////

	function getKarmaOptions () {
		var options = {
			files: config.karma.sourceFiles,
			exclude: config.karma.exclude,
			coverage: {
				dir: config.paths.report + 'coverage',
				reporters: [
					{ type: 'html', subdir: 'report-html' },
					{ type: 'text', subdir: '.', file: 'text.txt' },
					{ type: 'text-summary' }
				]
			},
			osxReporter: {
				notificationMode: 'failChange'
			},
			preprocessors: {}
		};
		options.preprocessors[config.karma.coverageFiles] = ['coverage'];
		return options;
	}
};
