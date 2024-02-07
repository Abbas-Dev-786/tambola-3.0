var mongoose = require("mongoose");

const qnaSchema = new mongoose.Schema({
  question: String, //To get array or answers
  answer: String,
});

module.exports = mongoose.model("QnA", qnaSchema);
