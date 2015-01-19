var fs = require('fs');
var router = require('express').Router();

var routesPath = __dirname + '/routes';

// get all route files
fs.readdir(routesPath, function (err, routes) {
	if (err) throw err;

	routes.forEach(function (route) {
		// add routes to router
		require(routesPath + '/' + route)(router);
	});
});

module.exports = router;
