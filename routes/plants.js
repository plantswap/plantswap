const express = require('express');
const Plant = require('../models/Plant');
const User = require('../models/User');
const router = express.Router();
const uploadCloud = require("../config/cloudinary");

const loginCheck = () => {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/auth/login');
    }
  };
};

router.get('/:plantId/edit', (req, res) => {

  const user = req.user;
  Plant.findById(req.params.plantId)
    .then(plant => {
      res.render('plants/edit', { plant: plant, user: user })
    }).catch(err => {
      console.log(err);
    });
})

router.post('/edit/:plantId', loginCheck(), uploadCloud.single("photo"), (req, res) => {
  const { species, size, description } = req.body;
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  Plant.findByIdAndUpdate(req.params.plantId, {
    species,
    size,
    description,
    imgName,
    imgPath
  })
    .then(plant => {
      res.redirect(`/plants/${plant._id}`);
    })
    .catch(err => {
      console.log(err);
    });
})

router.post('/:plantId/delete', (req, res) => {
  Plant.findByIdAndRemove(req.params.plantId)
.then(trashed => {
    console.log(`Success! selected entry was deleted from the database.`);
    res.redirect(`/plants/myplants`);
  }).catch(err => {
    console.log(err);
  })
})

router.post('/index', loginCheck(), uploadCloud.single("photo"), (req, res) => {
  const { species, size, description } = req.body;
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  Plant.create({
    species,
    size,
    description,
    user: req.user._id,
    imgName,
    imgPath
  }).then(plant => {
    console.log(`Success! ${species} was added to the database.`);
    res.redirect(`/plants/myplants`);
    // res.redirect(`/${plant._id}`);
  }).catch(err => {
    console.log(err);
  })
})

router.get('/index', (req, res) => {
  const user = req.user;
  Plant.find().populate('user').then(allPlants => {
    res.render('plants/index', { plants: allPlants, user: user });
    console.log(user)
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
    const user = req.user;
    res.render('plants/add', {user: user});
  });

router.get('/:plantId', (req, res) => {
  const user = req.user;
  const plantId = req.params.plantId;
  Plant.findById(plantId).populate('user').then(plant => {
    res.render('plants/plantDetails', { plant: plant, user: user });
  }).catch(err => {
    console.log(err);
  });
}); 


// ADDING PHOTOS 

router.post("/plants/add", uploadCloud.single("photo"), (req, res, next) => {
  const { title, description } = req.body;
  const imgPath = req.file.url;
  const imgName = req.file.originalname;

  Movie.create({ title, description, imgPath, imgName })
    .then(movie => {
      res.redirect("/");
    })
    .catch(error => {
      console.log(error);
    });
});


module.exports = router;