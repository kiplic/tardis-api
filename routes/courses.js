var Course = require('../models/course');

module.exports = function (router) {
	router.route('/')
		.get(function (req, res) {
            Course.find(function (err, courses) {
                if (err) res.send(err);

                res.json(courses);
            });
		})

		.post(function (req, res) {
            var course = new Course();

            course.dept = req.body.dept;
            course.num = req.body.num;
            course.title = req.body.title;
            course.semester = req.body.semester;
            course.year = req.body.semester;
            
            course.save(function (err) {
                if (err) res.send(err);

                res.json({
                    message: 'new course created with data: ' + JSON.stringify(req.body)
                });
            });
		});

	router.route('/:course_id')
		.get(function (req, res) {
            Course.findById(req.params.course_id, function (err, course) {
                if (err) res.send(err);

                res.json(course);
            });
		})

		.patch(function (req, res) {
            Course.findById(req.params.course_id, function (err, course) {
                if (err) res.send(err);

                // find fields in body then update them
                for (field in req.body) {
                    course[field] = req.body[field];
                }

                course.save(function (err) {
                    if (err) res.send(err);

                    res.json({
                        message: 'updated course with id: ' + req.params.course_id + ' with: ' + JSON.stringify(req.body)
                    });
                });
            });
		})

		.delete(function (req, res) {
            Course.remove({
                _id: req.params.course_id
            }, function (err, course) {
                if (err) res.send(err);

                res.json({
                    message: 'delete course with id: ' + req.params.id
                });
            });
		});

		

	// course queues
	router.route('/:course_id/queues')
		.get(function (req, res) {
			res.json({
				message: 'get all queues for course id: ' + req.params.course_id
			});
		})

		.post(function (req, res) {
			res.json({
				message: 'create queue for course id: ' + req.params.course_id + ' with body: ' + JSON.stringify(req.body)
			});
		});

	router.route('/:course_id/queues/:queue_id')
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
