const mongoose = require("mongoose");

const raiseHandSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User should be there"],
    },
    type: { type: String, required: [true, "scheme type should be there"] },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

raiseHandSchema.index({ name: 1, type: 1 }, { unique: true });

module.exports = mongoose.model("hands", raiseHandSchema);
