var uuid = require('node-uuid');
var redis = require('redis');
var redisClient = redis.createClient();

var Course = require('../models/course');
var Queue = require('../models/queue');

module.exports = function (router) {
	router.route('/')
		.get(function (req, res) {
            Course.find(function (err, courses) {
                if (err) res.send(err);

                res.json(courses);
            });
		})

		.post(function (req, res) {
            if (!Object.keys(req.body).length) {
                res.status(400).send('Empty post body');
            }

            var course = new Course();

            course.dept = req.body.dept;
            course.num = req.body.num;
            course.title = req.body.title;
            course.semester = req.body.semester;
            course.year = req.body.year;
            
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
            Queue.find({ courseId: req.params.course_id }, function (err, queues) {
                if (err) res.send(err);

                res.json(queues);
            });
		})

		.post(function (req, res) {
            // create uuid
            var id = uuid.v4();

            // create mongo doc
            var queue = new Queue({
                redisUuid: id,
                activeTas: [],
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                courseId: req.params.course_id,
                location: req.body.location,
                description: req.body.description,
                title: req.body.title
            });

            queue.save(function (err) {
                if (err) res.send(err);

                res.json({
                    message: 'created queue for course id: ' + req.params.course_id + ' with body: ' + JSON.stringify(req.body)
                });
            });
		});

	router.route('/:course_id/queues/:queue_id')
		.get(function (req, res) {
            Queue.findById(req.params.queue_id, function (err, queue) {
                if (err) res.send(err);

                res.json(queue);
            });
		})

		.patch(function (req, res) {
            Queue.findById(req.params.queue_id, function (err, queue) {
                if (err) res.send(err);

                var redisUuid = queue.redisUuid;
                var op = req.body.op;
                var studentData = JSON.parse(req.body.studentData);
                var index;

                switch (op) {
                    case 'push':
                        addStudentToQueue(redisUuid, studentData, function (err, orderResult, dataResult) {
                            index = [orderResult, dataResult];
                            res.json({
                                message: 'update queue with id: ' + req.params.queue_id,
                                index: index
                            });
                        });
                        break;

                    case 'pop':
                        popStudentFromQueue(redisUuid, function (err, compId, studentData) {
                            index = result;
                              res.json({
                                message: 'update queue with id: ' + req.params.queue_id,
                                index: index
                            });
                        });
                        break; 

                    case 'remove':
                        removeStudentFromQueue(redisUuid, req.body.compId, function (err, compId, studentData) {
                            index = result; 
                             res.json({
                                message: 'update queue with id: ' + req.params.queue_id,
                                index: index
                            });
                        });
                        break;
                        
                    default:
                        res.send(new Error('Invalid queue operation: ' + op));
                        break;
                }
                
            });
            
		})

		.delete(function (req, res) {
            Queue.remove({
                _id: req.params.queue_id
            }, function (err, queue) {
                if (err) res.send(err);

                res.json(queue);  
            });
			res.json({
				message: 'delete queue with id: ' + req.params.queue_id
			});
		});
};

/* Queue helper functions */
// make sure student doesn't already exist in queue
// remove order entry if error occurs on data entry
function addStudentToQueue(redisUuid, studentData, callback) {
    var orderQueue = 'order' + redisUuid;
    var dataQueue = 'data' + redisUuid;

    // check if student is new entry
    redisClient.hexists(dataQueue, studentData.compId, function (err, exists) {
        if (exists === 1) {
            callback(new Error('Student already exists in queue'));
        } else {
            // push student onto 'order' queue
            redisClient.rpush(orderQueue, studentData.compId, function (err, orderResult) {
                if (err) callback(err);

                // push student data onto 'data' queue
                var serialized = JSON.stringify(studentData);
                redisClient.hset(dataQueue, studentData.compId, serialized, function (err, dataResult) {
                    if (err) {
                        // remove order entry
                        redisClient.lrem(orderQueue, studentData.compId, function (error, _) {
                            if (error) throw new Error('Redis is having issues...');
                            callback(err);
                        });
                    }

                    // do something here
                    callback(null, orderResult, dataResult);
                });
            }); 
         
        }
    });
    }

// student removes themself
function removeStudentFromQueue(redisUuid, compId, callback) {
    var orderQueue = 'order' + redisUuid;
    var dataQueue = 'data' + redisUuid;
    
    redisClient.lrem(orderQueue, compId, function (err, result) {
        if (err) callback(err);

        redisClient.hget(dataQueue, compId, function (err, studentData) {
            // remove student data from data queue
            redisClient.hdel(dataQueue, compId, function (err, dataResult) {
                if (err) callback(err);

                callback(null, compId, studentData);
            }); 
        });


    });
}

// ta removes student
function popStudentFromQueue(redisUuid, callback) {
    var orderQueue = 'order' + redisUuid;
    var dataQueue = 'data' + redisUuid;

    redisClient.lpop(orderQueue, function (err, compId) {
        if (err) callback(err);

        redisClient.hget(dataQueue, compId, function (err, studentData) {
            // remove student data from data queue
            redisClient.hdel(dataQueue, compId, function (err, dataResult) {
                if (err) callback(err);

                callback(null, compId, studentData);
            });           
        });

    });
}

