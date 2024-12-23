const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,

    max: 30,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 9,

    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  avatarImage: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("User", userSchema);
