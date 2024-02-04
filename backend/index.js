require("./config/config");
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

// import route handlers
const {
  login,
  protect,
  restrictTo,
  checkAdmin,
} = require("./controllers/authController");
const { getAllAnswers } = require("./controllers/answerController");
const {
  generateTickets,
  getTicket,
} = require("./controllers/ticketController");
const {
  getRandomQuestion,
  startNewGame,
  getAllQuestions,
} = require("./controllers/questionController");
const {
  raiseHand,
  getAllRaiseHands,
} = require("./controllers/raiseHandController");

// import utils modules
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(helmet());

// routes
app.get("/api/startGame", protect, restrictTo("admin"), startNewGame);
app.post("/api/login", login);
app.post("/api/admin/login", checkAdmin, login);
app.get("/api/answers", protect, restrictTo("admin"), getAllAnswers);
app.get("/api/question", protect, restrictTo("admin"), getRandomQuestion);
app.get("/api/question/all", protect, restrictTo("admin"), getAllQuestions);
app.post("/api/generateTicket", protect, restrictTo("admin"), generateTickets);
app.get("/api/ticket", protect, getTicket);
app.get(
  "/api/raiseHand/all",
  protect,
  restrictTo("admin"),
  protect,
  getAllRaiseHands
);
app.post("/api/raiseHand", protect, raiseHand);

// invalid route handler
app.all("*", (req, _, next) =>
  next(new AppError(`The route ${req.originalUrl} does not exists`, 404))
);

// global error handler
app.use(globalErrorHandler);

// Run Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on ", PORT);
});
