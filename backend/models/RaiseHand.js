const mongoose = require("mongoose");

const raiseHandSchema = new mongoose.Schema({
  name: String,
  type: String,
});

module.exports = mongoose.model("hands", raiseHandSchema);
