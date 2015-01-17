module.exports = function (router) {
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
};