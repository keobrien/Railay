'use strict';

/* global requirejs */
requirejs.config({
	shim: {
		jquery: {
			deps: [

			],
			exports: 'jQuery'
		},
		angular: {
			exports: 'angular'
		},
		'angular-ui-router': {
			deps: [
				'angular'
			]
		},
		'angular-mocks': {
			deps: [
				'angular'
			],
			exports: 'angularMocks'
		}
	},
	paths: {
		bower: '../bower_components',
		jquery: '../bower_components/jquery/dist/jquery.min',
		angular: '../bower_components/angular/angular.min',
		'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router.min',
		'angular-mocks': '../bower_components/angular-mocks/angular-mocks'
	},
	modules: [
		{
			name: 'main'
			//, include: [
			//	'angular-example/app'
			//]
		},
		{
			name: 'angular-example/app'
		}
	]
});
