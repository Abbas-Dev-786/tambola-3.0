const QnA = require("../models/QnA");
const RaiseHand = require("../models/RaiseHand");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

let isGameStarted = false;

// get a random question controller
module.exports.getRandomQuestion = catchAsync(async (req, res, next) => {
  if (!isGameStarted) {
    return next(new AppError("Please start the game", 400));
  }

  // Find a random question that has not been asked before
  const randomQuestion = await QnA.aggregate([
    { $match: { isAsked: false } },
    { $sample: { size: 1 } },
  ]);

  if (!randomQuestion.length) {
    return next(new AppError("No questions available", 404));
  }

  // update isAsked field
  await QnA.findByIdAndUpdate(randomQuestion[0]._id, { isAsked: true });

  res.status(200).json({ status: "success", data: randomQuestion[0].question });
});

// start game controller
module.exports.startNewGame = catchAsync(async (req, res, next) => {
  isGameStarted = true;

  // reset all fields in QnA model
  await QnA.updateMany({}, { isAsked: false });

  // delete all raise hands model
  await RaiseHand.deleteMany({});

  res.status(200).json({ status: "success" });
});

// get all questions controller
module.exports.getAllQuestions = catchAsync(async (req, res, next) => {
  const results = await QnA.find({});

  const questions = await results?.map((result) => result.question);

  res.status(200).json({
    status: "success",
    data: questions,
    results: questions.length,
  });
});

// get all asked questions controller
module.exports.getAllAskedQuestion = catchAsync(async (req, res, next) => {
  if (!isGameStarted) {
    return next(new AppError("Please start the game", 400));
  }

  const questions = await QnA.find({ isAsked: true }).sort({ updatedAt: 1 });

  res.status(200).json({
    status: "success",
    data: questions,
    results: questions.length,
  });
});
