const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//user model for player's login

const userSchema = new mongoose.Schema({
  id: String,
  user: String,
  password: String,
  name: String,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.methods.comparePasswords = async (enteredPassword, storedPassword) =>
  await bcrypt.compare(enteredPassword, storedPassword);

module.exports = mongoose.model("players", userSchema);
