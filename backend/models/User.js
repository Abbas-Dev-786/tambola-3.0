var mongoose = require('mongoose');

//user model for player's login

const userSchema = new mongoose.Schema({
  id:String,
  user:String,
  password:String,
  name:String
});

module.exports = mongoose.model('players', userSchema);