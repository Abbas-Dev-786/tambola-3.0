require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const URL = process.env.DATABASE;
// Connect to database
try {
  mongoose.connect(URL, {});
  console.log("Database Connected Successfully");
} catch (err) {
  console.log("Database Not Connected");
}
