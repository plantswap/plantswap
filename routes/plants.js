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
 

  router.get('/searchresults', (req, res) => {
    const user = req.user;
    let plantResults;
    Plant.find().populate('user')
    .then(allPlants => {
      let plantResults
      if (req.query.city) {
        plantResults = allPlants.filter(plant=>plant
          .species
          .toLowerCase()
          .includes(req.query.species.toLowerCase()) 
          && plant.user.city.toLowerCase()==req.query.city.toLowerCase()
          )
      } else {
        plantResults = allPlants.filter(plant=>plant
          .species
          .toLowerCase()
          .includes(req.query.species.toLowerCase()) 
        )
      }
      res.render('plants/index', { plants: plantResults, user: user, city: req.query.city||user.city });
      console.log(user)
    }).catch(err => {
      console.log(err);
    })
  });


router.post('/index', loginCheck(), uploadCloud.single("photo"), (req, res) => {
  console.log("working?")
  const { species, size, description } = req.body;
  let imgPath, imgName;
  if (species === '') {
    console.log("please specify plant species.")
    res.render('plants/add', { message: 'please specify plant species.' });
    return;
  }
    if (req.file) {
      imgPath = req.file.url;
      imgName = req.file.originalname;
    }
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
  }).catch(err => {
    console.log(err);
  })
})

router.get('/index', (req, res) => {
  const user = req.user;
  Plant.find().populate('user').then(allPlants => {
    res.render('plants/index', { plants: allPlants, user: user, city: user.city});
    console.log(user)
  }).catch(err => {
    console.log(err);
  })
});

router.get('/myplants', loginCheck(), (req, res, next) => {
  const user = req.user;
  Plant.find({user: req.user._id})
  .then(myPlants => {
    res.render('plants/myplants', { plants: myPlants, user: user});
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
    console.log(typeof plant.user._id, user._id)
    if (user._id.toString() == plant.user._id.toString()) {
      console.log("user is owner")
      res.render('plants/myPlantDetails', { plant: plant, user: user });
    } else {
      res.render('plants/plantDetails', { plant: plant, user: user });
    }
  }).catch(err => {
    console.log(err);
  });
});

router.post("/plants/add", uploadCloud.single("photo"), (req, res, next) => {
  const { title, description } = req.body;
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
}); 

module.exports = router;