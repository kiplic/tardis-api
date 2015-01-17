var fs = require('fs');

var router = require('express').Router();

var routeDir = __dirname + '/routes';
router.get('/', function (req, res) {
	res.json({
		message: 'hooray! welcome to the api'
	});
});


fs.readdir(routeDir, function (err, filenames) {
	if (err) throw err;

	filenames.forEach(function (file) {
		// add routes for each file
		require(routeDir + '/' + file)(router);
	});
});



module.exports = router;