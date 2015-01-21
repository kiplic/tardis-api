module.exports = function (router) {
	router.route('/')
		.get(function (req, res) {
			res.json({
				message: 'get all courses'
			});
		})

		.post(function (req, res) {
			res.json({
				message: 'create new course with data: ' + JSON.stringify(req.body)
			});
		});

	router.route('/:id')
		.get(function (req, res) {
			res.json({
				message: 'get course with id: ' + req.params.id
			});
		})

		.patch(function (req, res) {
			res.json({
				message: 'update course with id: ' + req.params.id
			});
		})

		.delete(function (req, res) {
			res.json({
				message: 'delete course with id: ' + req.params.id
			});
		});

		

	// course queues
	router.route('/:id/queues')
		.get(function (req, res) {
			res.json({
				message: 'get all queues for course id: ' + req.params.id
			});
		})

		.post(function (req, res) {
			res.json({
				message: 'create queue for course id: ' + req.params.id + ' with body: ' + req.body
			});
		});

	router.route('/:id/queues/:queue_id')
		.get(function (req, res) {
			res.json({
				message: 'get queue with id: ' + req.params.queue_id
			});
		})

		.patch(function (req, res) {
			res.json({
				message: 'update queue with id: ' + req.params.queue_id
			});
		})

		.delete(function (req, res) {
			res.json({
				message: 'delete queue with id: ' + req.params.queue_id
			});
		});
};
