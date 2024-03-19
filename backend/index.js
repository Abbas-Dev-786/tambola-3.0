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
const {
  generateTickets,
  getTicket,
  getUserTicket,
} = require("./controllers/ticketController");
const {
  getRandomQuestion,
  startNewGame,
  getAllQuestions,
  getAllAskedQuestion,
  continueGame,
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

// routes for login
app.post("/api/login", login);
app.post("/api/admin/login", checkAdmin, login);

// auth middleware
app.use(protect);

// routes for players
app.get("/api/ticket", getTicket);
app.post("/api/raiseHand", raiseHand);

// check admin middleware
app.use(restrictTo("admin"));

// routes for admin
app.post("/api/generateTicket", generateTickets);
app.get("/api/startGame", startNewGame);
app.get("/api/continueGame", continueGame);
app.get("/api/question", getRandomQuestion);
app.get("/api/question/asked/all", getAllAskedQuestion);
app.get("/api/question/all", getAllQuestions);
app.get("/api/ticket/user/:id", getUserTicket);
app.get("/api/raiseHand/all", getAllRaiseHands);

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
