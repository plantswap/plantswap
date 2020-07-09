const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email:String,
  password: String,
  country: String,
  zip: String,
  city: String,
  street: String,
  house: Number,
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;