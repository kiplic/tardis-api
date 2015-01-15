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

router.get('/courses', function (req, res) {
	res.json({
		message: 'get all courses'
	});
});

router.get('/courses/:id', function (req, res) {
	res.json({
		message: 'get course by id'
	});
});

router.route('/courses/:id/queues')
	.get(function (req, res) {
			res.json({
			message: 'get all queues by course id'
		});
	})
	.post(function (req, res) {
		res.json({
			message: 'create a new queue for a course',
			examples: {
				name: 'queue_name'
			},
			returns: 'id of created queue'
		});
	});

router.route('/queues')
	.get(function (req, res) {
			res.json({
			message: 'get all queues'
		});
	});

router.route('/queues/:id')
	.get(function (req, res) {
		res.json({
			message: 'get queue by id'
		});
	})
	.patch(function (req, res) {
		res.json({
			message: 'update queue by id',
			examples: [
				{
					op: 'push',
					id: 'dgm3df'
				},
				{
					op: 'pop'
				},
				{
					op: 'remove',
					id: 'dgm3df'
				}
			]
		});
	})
	.delete(function (req, res) {
		res.json({
			message: 'delete queue by id'
		});
	});

app.use('/v1', router);

app.listen(port);
console.log('API listening on port: ' + port + '...');
