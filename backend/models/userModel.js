const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email address'],
    unique: true,
    validate: [validator.isEmail, 'Please provide a valide email']
  },
  name: {
    type: String,
    required: [true, 'Please provide your name']
  },
  photo: {
    type: String
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm your password']
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;