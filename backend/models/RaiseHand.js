const mongoose = require("mongoose");

const raiseHandSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "players",
      required: [true, "User should be there"],
    },
    type: { type: String, required: [true, "scheme type should be there"] },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// unique combination indexing
raiseHandSchema.index({ user: 1, type: 1 }, { unique: true });

// pre find hook to populate user details
raiseHandSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name id",
  });

  next();
});

module.exports = mongoose.model("hands", raiseHandSchema);
