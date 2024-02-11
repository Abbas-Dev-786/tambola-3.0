var mongoose = require("mongoose");

const qnaSchema = new mongoose.Schema(
  {
    question: { type: String, required: [true, "question is mandatory."] },
    answer: { type: String, required: [true, "answer is mandatory."] },
    isAsked: { type: Boolean, default: false },
    type: { type: String, default: "text" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("QnA", qnaSchema);
