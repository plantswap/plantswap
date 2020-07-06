const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
species: String,
size: {
    type: String,
    enum: ['cutting', 'mature'],
    default: 'cutting'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;