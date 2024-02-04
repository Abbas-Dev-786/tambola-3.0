const mongoose = require("mongoose");

const raiseHandSchema = new mongoose.Schema({
  name: { type: String, required: [true, "User name should be there"] },
  type: { type: String, required: [true, "scheme type should be there"] },
});

raiseHandSchema.index({ name: 1, type: 1 }, { unique: true });

module.exports = mongoose.model("hands", raiseHandSchema);
