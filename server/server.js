var config = require('../build/config')(process.env.NODE_ENV);
var express = require('express');
var app = express();
var nunjucks = require('nunjucks');

require('./routes.js')(app, express, config);

var server = app.listen(config.server.port, function () {
	console.info('Serving on http://localhost:' + config.server.port);
});
