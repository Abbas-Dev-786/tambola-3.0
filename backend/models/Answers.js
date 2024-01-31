var mongoose = require('mongoose');

const answersSchema = new mongoose.Schema({
    answers:Array //To get array or answers
});

module.exports = mongoose.model('answers', answersSchema);