const RaiseHand = require("../models/RaiseHand");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

module.exports.raiseHand = catchAsync(async (req, res, next) => {
  const { type } = req.body;

  if (!type) {
    return next(new AppError("Enter scheme type", 400));
  }

  const hand = await RaiseHand.create({ name: req.user.name, type });

  res.status(200).json({ status: "success", data: hand });
});

module.exports.getAllRaiseHands = catchAsync(async (req, res, next) => {
  const hands = await RaiseHand.find({});

  res
    .status(200)
    .json({ status: "success", data: hands, results: hands.length });
});
