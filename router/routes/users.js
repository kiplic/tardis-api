module.exports = function (router) {
	router.route('/users')
		.get(function (req, res) {
			res.json({
				message: 'get all users'
			});
		})

		.post(function (req, res) {
			res.json({
				message: 'create new user with body: ' + JSON.stringify(req.body)
			});
		});

	router.route('/users/:id')
		.get(function (req, res) {
			res.json({
				message: 'get user with id: ' + req.params.id
			});
		})

		.patch(function (req, res) {
			res.json({
				message: 'update user with id: ' + req.params.id
			});
		})

		.delete(function (req, res) {
			res.json({
				message: 'delete user with id: ' + req.params.id
			});
		});
};
