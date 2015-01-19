module.exports = function (router) {
	router.get('/queues', function (req, res) {
		res.json({
			message: 'list all queues'
		});
	});

	router.route('/queues/:id')
		.get(function (req, res) {
			res.json({
				message: 'get queue with id: ' + req.params.id
			});
		})

		.patch(function (req, res) {
			res.json({
				message: 'update queue with id: ' + req.params.id
			});
		})

		.delete(function (req, res) {
			res.json({
				message: 'delete queue with id: ' + req.params.id
			});
		});
};
