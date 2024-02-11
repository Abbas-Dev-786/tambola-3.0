const jwt = require("jsonwebtoken");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

const signToken = (id) =>
  // returns a signed jwt
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createAndSendToken = (res, user) => {
  // creates token and send response to user
  const token = signToken(user._id);

  user.password = undefined;
  user.updatedAt = undefined;

  res.status(200).json({ status: "success", data: { user, token } });
};

module.exports.login = catchAsync(async (req, res, next) => {
  const { userId, password } = req.body;

  // validation checks
  if (!userId || !password) {
    return next(new AppError("userId and password are required", 400));
  }

  const user = await User.findOne({ user: userId }).select("+password");

  // check password
  if (!user || !(await user.comparePasswords(password, user.password))) {
    return next(
      new AppError("Invalid credentials. Please check userID or password", 400)
    );
  }

  // if each checks are passed then create and send token to user
  createAndSendToken(res, user);
});

module.exports.protect = catchAsync(async (req, res, next) => {
  // allows access to only signed users
  let token;

  // get token from request headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // verify jwt
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  // find current user from jwt id
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  req.user = currentUser;
  next();
});

module.exports.restrictTo = (role) => {
  // allows role based access to users
  return (req, res, next) => {
    if (role !== req?.user?.role) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};

module.exports.checkAdmin = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ user: req.body.userId });

  if (user?.role != "admin") {
    return next(new AppError("You are not a Admin", 400));
  }

  next();
});
