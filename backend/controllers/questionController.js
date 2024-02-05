const questions = require("../data/questions");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

let isGameStarted = false;
let remainingQuestions = [...questions];
let askedQuestions = Array(questions.length).fill(null);

module.exports.getRandomQuestion = catchAsync(async (req, res, next) => {
  if (!isGameStarted) {
    return next(new AppError("Please start the game", 400));
  }

  // Check if there are remaining questions
  if (remainingQuestions.length === 0) {
    return next(new AppError("No more questions available.", 400));
  }

  // Generate a random index
  const randomIndex = Math.floor(Math.random() * remainingQuestions.length);

  // Get the random question
  const randomQuestion = remainingQuestions[randomIndex];

  // Remove the selected question to ensure uniqueness
  remainingQuestions.splice(randomIndex, 1);

  // set asked question
  askedQuestions[randomIndex] = randomQuestion;

  res.status(200).json({ status: "success", data: randomQuestion });
});

module.exports.startNewGame = catchAsync(async (req, res, next) => {
  isGameStarted = true;
  remainingQuestions = [...questions];
  askedQuestions = Array(questions.length).fill(null);

  res.status(200).json({ status: "success" });
});

module.exports.getAllQuestions = catchAsync(async (req, res, next) => {
  // if (!isGameStarted) {
  //   return next(new AppError("Please start the game", 400));
  // }

  res.status(200).json({
    status: "success",
    data: questions,
    results: askedQuestions.length,
  });
});
