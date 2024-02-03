const Tickets = require("../models/Tickets");
const Answers = require("../models/Answers");

const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

module.exports.getTicket = catchAsync(async (req, res, next) => {
  let ticket = await Tickets.findOne({ id: req.user.id });

  if (!ticket) {
    return next(new AppError("Ticket does not exists for the user", 404));
  }

  res.status(200).json({ status: "success", data: ticket });
});

module.exports.generateTickets = catchAsync(async (req, res, next) => {
  if (!req.body.count) {
    return next(
      new AppError("Please Enter the tickets count to generate", 400)
    );
  }

  let result = await Answers.find();
  let answersArray = result[0]["answers"];

  let shuffled = answersArray.sort(() => 0.5 - Math.random());

  const generatedTickets = [];

  //create requested tickets
  for (let i = 0; i < req.body.count; i++) {
    //create 3 constant rows for ticket with same empty spaces
    let row1 = shuffled
      .slice(0, 5)
      .sort(() => 0.5 - Math.random())
      .concat(new Array(4).fill(null))
      .sort(() => 0.5 - Math.random());
    row1 = row1.sort(() => 0.5 - Math.random());

    let row2 = shuffled
      .slice(5, 10)
      .sort(() => 0.5 - Math.random())
      .concat(new Array(4).fill(null))
      .sort(() => 0.5 - Math.random());
    row2 = row2.sort(() => 0.5 - Math.random());

    let row3 = shuffled
      .slice(10, 15)
      .sort(() => 0.5 - Math.random())
      .concat(new Array(4).fill(null))
      .sort(() => 0.5 - Math.random());
    row3 = row3.sort(() => 0.5 - Math.random());

    //combine whole array of answer ticket
    // let array = row1.concat(row2, row3);
    const array = [row1, row2, row3];

    const newTicket = await Tickets.create({
      answers: array,
    }); // create new ticket
    generatedTickets.push(newTicket);
  }

  res.status(201).json({ status: "success", data: generatedTickets });
});
