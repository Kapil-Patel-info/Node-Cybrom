const mongoose = require("mongoose");
const { Schema } = mongoose; // Import Schema from mongoose

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number, // Change to Number
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const userLogin = mongoose.model('User Login', userSchema);
module.exports = userLogin;
