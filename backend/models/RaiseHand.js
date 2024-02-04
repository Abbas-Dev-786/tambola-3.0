const mongoose = require("mongoose");

const raiseHandSchema = new mongoose.Schema({
  name: String,
  type: String,
});

raiseHandSchema.index({ name: 1, type: 1 }, { unique: true });

module.exports = mongoose.model("hands", raiseHandSchema);
