var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var hoursFromNow = function (hours) {
    var date = new Date();
    date.setHours(
        date.getHours() + hours
    );

    return date;
};

var fields = {
    activeTas: [String],
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date, default: hoursFromNow(1) },
    courseId: ObjectId,
    location: String,
    description: String,
    title: String,
    redisUuid: String
};

var queueSchema = new Schema(fields);
module.exports = mongoose.model('Queue', queueSchema);
