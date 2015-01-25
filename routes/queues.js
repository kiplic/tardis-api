var Queue = require('../models/queue');

module.exports = function (router) {
    router.route('/')
        .get(function (req, res) {
            Queue.find(function (err, queues) {
                if (err) res.send(err);

                res.json(queues);
            });
        });
};

