const QnA = require("../models/QnA");
const catchAsync = require("../utils/catchAsync");

module.exports.getAllAnswers = catchAsync(async (req, res, next) => {
  let result = await QnA.find();

  res.status(200).json({
    status: "success",
    data: result[0]["answers"],
    results: result[0]["answers"].length,
  });
});
