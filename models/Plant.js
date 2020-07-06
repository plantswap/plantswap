const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const plantSchema = new Schema({
species: String,
size: {
    type: String,
    enum: ['cutting', 'mature'],
    default: 'cutting'
  },
  description: String,
  owner: String
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;