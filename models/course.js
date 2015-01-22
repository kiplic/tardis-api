var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fields = {
    dept: { type: String },
    num: { type: String },
    title: { type: String },
    semester: { type: String, enum: ['spring', 'fall', 'summer', 'winter'] },
    year: { type: Number }
};

var courseSchema = new Schema(fields);

module.exports = mongoose.model('Course', courseSchema);
