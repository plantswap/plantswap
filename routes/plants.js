const express = require('express');
const Plant = require('../models/Plant');
const User = require('../models/User');
const router = express.Router();

const loginCheck = () => {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/auth/login');
    }
  };
};

router.get('/index', (req, res) => {
  Plant.find().populate('user').then(allPlants => {
    res.render('plants/index', { plants: allPlants });
  }).catch(err => {
    console.log(err);
  })
});

router.get('/myplants', loginCheck(), (req, res, next) => {
  const user = req.user;
  Plant.find({user: req.user._id})
  .then(myPlants => {
    res.render('plants/myplants', { plants: myPlants, user: user });
  }).catch(err => {
    console.log(err);
  })
});

  router.get('/add', loginCheck(), (req, res, next) => {
    res.render('plants/add');
  });

router.get('/:plantId', (req, res) => {
  const plantId = req.params.plantId;
  Plant.findById(plantId).populate('user').then(plant => {
    res.render('plants/plantDetails', { plant: plant });
  }).catch(err => {
    console.log(err);
  });
}); 

router.post('/index', loginCheck(), (req, res) => {
  console.log(req.body);
  const { species, size, description } = req.body;
  Plant.create({
    species,
    size,
    description,
    user: req.user._id
  }).then(plant => {
    console.log(`Success! ${species} was added to the database.`);
    res.redirect(`/plants/myplants`);
    // res.redirect(`/${plant._id}`);
  }).catch(err => {
    console.log(err);
  })
})


module.exports = router;