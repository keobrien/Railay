'use strict';

var config = require('./build/config')();
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});

require('./build/tasks/copy/copy.js')(gulp, config, $);
require('./build/tasks/vet/vet.js')(gulp, config, $);
require('./build/tasks/test/test.js')(gulp, config, $);
require('./build/tasks/wiredep/wiredep.js')(gulp, config, $);
require('./build/tasks/sass/sass.js')(gulp, config, $);
require('./build/tasks/delete/delete.js')(gulp, config, $);
require('./build/tasks/babel/babel.js')(gulp, config, $);
require('./build/tasks/requirejs/requirejs.js')(gulp, config, $);
require('./build/tasks/build/build.js')(gulp, config, $);
require('./build/tasks/serve/serve.js')(gulp, config, $);

/**
 * List the available gulp tasks
 */
gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

module.exports = gulp;
