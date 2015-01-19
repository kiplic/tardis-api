module.exports = function (router) {
	router.route('/courses')
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

	router.route('/courses/:id')
		.get(function (req, res) {
			res.json({
				message: 'get course with id: ' + req.params.id
			});
		})

		.put(function (req, res) {
			res.json({
				message: 'update course with id: ' + req.params.id
			});
		})

		.delete(function (req, res) {
			res.json({
				message: 'delete course with id: ' + req.params.id
			});
		});
};
