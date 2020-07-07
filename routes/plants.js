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
  Plant.find().then(allPlants => {
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

// router.get('/books/edit/:bookId', (req, res) => {
//   Book.findById(req.params.bookId)
//     .then(book => {
//       res.render('bookEdit', { book: book })
//     }).catch(err => {
//       console.log(err);
//     });
// })

// router.get('/books/delete/:bookId', (req, res) => {
//   Book.deleteOne({ _id: req.params.bookId })
//     .then(() => {
//       res.redirect('/books');
//     })
//     .catch(err => {
//       console.log(err);
//       // next(err)
//     })
// })

// router.post('/books/edit/:bookId', (req, res) => {
//   const { title, author, description, rating } = req.body;
//   Book.findByIdAndUpdate(req.params.bookId, {
//     title,
//     description,
//     author,
//     rating
//   })
//     .then(book => {
//       res.redirect(`/books/${book._id}`);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// })

module.exports = router;