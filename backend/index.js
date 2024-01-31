require("./config/config");
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

// Import models
const User = require("./models/User");
const Tickets = require("./models/Tickets");
const Answers = require("./models/Answers");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

//user login route
app.post("/login", async (req, res) => {
  if (req.body.password && req.body.user) {
    //if userId and password are in request
    let user = await User.findOne(req.body);
    if (user) {
      //if user found in db
      res.send(user);
    } else {
      //if no user found in db
      res.send({ result: "No user found" });
    }
  } else {
    //if userId and password are not in request
    res.send({ result: "No user found" });
  }
});

//get answers array stored in db through which tickets will be generated
app.get("/getanswers", async (req, res) => {
  let result = await Answers.find();

  // get array with name answers
  let answersArray = result[0]["answers"];
  if (answersArray) {
    // if answers array is stored in db
    res.send(answersArray);
  } else {
    // if answers array not is stored in db
    res.send({ result: "Answers not found" });
  }
});

//api to generate tickets from answers stored in db
app.post("/generateticket", async (req, res) => {
  if (req.body.count) {
    //get the number of tickets to be generated
    let tickets = req.body.count;
    let generatedTickets = [];

    // get answers array from db
    const getAnswers = "http://localhost:5000/getanswers";
    const response = await axios.get(getAnswers);
    const answersArray = response.data;

    // suffle whole array
    let shuffled = answersArray.sort(() => 0.5 - Math.random());

    //create requested tickets
    for (let i = 0; i < tickets; i++) {
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
      let array = row1.concat(row2, row3);

      //create new ticket with unique combination of answers
      try {
        const newTicket = await Tickets.create({
          answers: array,
        }); // create new ticket
        generatedTickets.push(newTicket); // push new ticket to generatedTickets
      } catch (err) {
        console.error(err);
        res.status(500).send("Error creating new ticket");
      }
    }

    // send response with new tickets data
    res.status(200).send(generatedTickets);
  } else {
    res.send({ result: "No ticket count found" });
  }
});

//route to get ticket according to user id
app.post("/ticket", async (req, res) => {
  if (req.body.data.id) {
    //if id for user found
    let user_id = req.body.data.id;
    let ticket = await Tickets.findOne({ id: user_id }); //find ticket with same id as user

    if (ticket) {
      //if ticket found
      res.send(ticket);
    } else {
      res.send({ result: "No Ticket found" });
    }
  } else {
    res.send({ result: "No id found" });
  }
});

// Run Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on ", PORT);
});
