var User = require('../models/user');

module.exports = function (router) {
	router.route('/')
		.get(function (req, res) {
            User.find(function (err, users) {
                if (err) res.send(err);

                res.json(users);
            });
		})

        // only used for uploading rosters
		.post(function (req, res) {
            var user = new User();
            user.first_name = req.body.first_name;
            user.last_name = req.body.last_name;
            user.comp_id = req.body.comp_id;
            user.role = req.body.role;

            user.save(function (err) {
                if (err) res.send(err);

                res.json({
                    message: 'user created with body: ' + JSON.stringify(req.body)
                });

            });
        });

	router.route('/:user_id')
		.get(function (req, res) {
            Course.findById(req.params.user_id, function (err, user) {
                if (err) res.send(err);

                res.json(user);
            });
		})

		.patch(function (req, res) {
			res.json({
				message: 'update user with id: ' + req.params.user_id
			});
		})

		.delete(function (req, res) {
			res.json({
				message: 'delete user with id: ' + req.params.user_id
			});
		});
};
