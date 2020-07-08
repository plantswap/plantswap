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
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  imgName: String,
  imgPath: String
},
{
  timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
}
);

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;