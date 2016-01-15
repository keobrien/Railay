module.exports = function (app, express, config) {

	var nunjucks = require('nunjucks');
	var fs = require('fs');
	var _403Forbidden = [
		'*.nunj'
	];

	app.set('views', config.server.www_root);
	nunjucks.configure(app.get('views'), {
		autoescape: true,
		express   : app,
		noCache   : true
	});
	app.set('view engine', 'nunj');

	app.get(_403Forbidden, function (req, res) {
		res.status(403);
		res.send('403').end();
	});

	app.use('/bower_components', express.static(config.bower.directory));
	app.use('/', express.static(config.server.www_root + '/'));

	app.get('*', function (req, res) {

		var path    = req._parsedUrl.path,
			fsPath = process.cwd() + '/' + config.server.www_root + path;

		try {
			var stats = fs.lstatSync(fsPath);

			if (stats.isDirectory) {
				res.render(fsPath + 'index.nunj');
			} else if (stats.isFile && (path.indexOf(/\.html$/) > 0)) {
				res.render(fsPath);
			}
		} catch (err) {
			res.status(404);
			res.send('404').end();
		}
	});
};
