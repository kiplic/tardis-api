var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fields = {
    comp_id: { type: String },
    first_name: { type: String },
    last_name: { type: String },
    role: { type: String, enum: ['professor', 'student', 'ta'] }
};

var userSchema = new Schema(fields);

module.exports = mongoose.model('User', userSchema);
