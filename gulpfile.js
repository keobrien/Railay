'use strict';

var config = require('./build/config')();
var gulp = require('gulp');

require('./build/tasks/copy/copy.js')(gulp, config);
require('./build/tasks/vet/vet.js')(gulp, config);
require('./build/tasks/test/test.js')(gulp, config);
require('./build/tasks/sass/sass.js')(gulp, config);
require('./build/tasks/babel/babel.js')(gulp, config);
require('./build/tasks/requirejs/requirejs.js')(gulp, config);
require('./build/tasks/build/build.js')(gulp, config);
require('./build/tasks/serve/serve.js')(gulp, config);
require('./build/tasks/test-railay-build/test-railay-build.js')(gulp, config);

gulp.task('default', ['serve-dev']);

module.exports = gulp;
