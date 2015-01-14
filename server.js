var express= require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

var router = express.Router();

router.get('/', function (req, res) {
	res.json({
		message: 'hooray! welcome to the api'
	});
});

app.use('/v1', router);

app.listen(port);
console.log('API listening on port: ' + port + '...');
