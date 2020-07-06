const mongoose = require('mongoose');
const Plant = require('../models/Plant');

mongoose.connect('mongodb://localhost/plantswap', {
  useNewUrlParser: true
});
const plants = [
  { 
    species: 'Ficus Elastica',
    size: "cutting",
    description: "rooted ficus elastica cutting"
  }, 
  { 
    species: 'Rhypsalis Heidelberg',
    size: "mature",
    description: "90cm rhypsalis plant"
  }
]

 Plant.create(celebrities).then(data => {
  console.log(`Success! plants were added to the database.`);
  mongoose.connection.close();
}).catch(err => {
  console.log(err);
})