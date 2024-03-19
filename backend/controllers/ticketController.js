const Tickets = require("../models/Tickets");
const QnA = require("../models/QnA");

const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const shuffleArray = require("../utils/shuffleArray");

// get ticket controller for logged in players
module.exports.getTicket = catchAsync(async (req, res, next) => {
  let ticket = await Tickets.findOne({ id: req.user.id });

  if (!ticket) {
    return next(new AppError("Ticket does not exists for the user", 404));
  }

  res.status(200).json({ status: "success", data: ticket });
});

// get any users ticket controller only for admin
module.exports.getUserTicket = catchAsync(async (req, res, next) => {
  let ticket = await Tickets.findOne({ id: req.params.id });

  if (!ticket) {
    return next(new AppError("Ticket does not exists for the user", 404));
  }

  res.status(200).json({ status: "success", data: ticket });
});

// generate ticket controller
module.exports.generateTickets = catchAsync(async (req, res, next) => {
  if (!req.body.count) {
    return next(
      new AppError("Please Enter the tickets count to generate", 400)
    );
  }

  let result = await QnA.find();
  let answersArray = result.map((res) => res.answer);

  const generatedTickets = [];

  //create requested tickets
  for (let i = 0; i < req.body.count; i++) {
    let shuffled = shuffleArray(answersArray.slice()); // make a copy before shuffling
    let ticket = [];

    // Create rows for ticket with 5 answers and 4 empty spaces each
    for (let j = 0; j < 3; j++) {
      let row = shuffled
        .slice(j * 5, (j + 1) * 5)
        .concat(new Array(4).fill(null));
      ticket = ticket.concat(row).sort(() => 0.5 - Math.random());
    }

    const newTicket = await Tickets.create({
      answers: ticket,
    }); // create new ticket
    generatedTickets.push(newTicket);
  }

  res.status(201).json({ status: "success", data: generatedTickets });
});

module.exports.generateTicketMiddleware = catchAsync(async (req, res, next) => {
  let result = await QnA.find();
  let answersArray = result.map((res) => res.answer);

  //create requested tickets
  let shuffled = shuffleArray(answersArray.slice()); // make a copy before shuffling
  let ticket = [];

  // Create rows for ticket with 5 answers and 4 empty spaces each
  for (let j = 0; j < 3; j++) {
    let row = shuffled
      .slice(j * 5, (j + 1) * 5)
      .concat(new Array(4).fill(null));
    ticket = ticket.concat(row).sort(() => 0.5 - Math.random());
  }

  const newTicket = await Tickets.create({
    answers: ticket,
  }); // create new ticket

  req.ticket = newTicket;
  next();
});
