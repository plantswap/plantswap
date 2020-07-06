const express = require('express');
const Plant = require('../models/Plant');
const User = require('../models/User');
const router = express.Router();

router.get('/index', (req, res) => {
  Plant.find().then(allPlants => {
    // render a 'books' view with the books data
    // console.log(booksFromDatabase);
    res.render('plants/index', { plants: allPlants });
  }).catch(err => {
    console.log(err);
  })
});

router.get('/myplants', (req, res, next) => {
  Plant.find({owner: req.user._id})
  .then(myPlants => {
    res.render('plants/myplants', { plants: myPlants });
  }).catch(err => {
    console.log(err);
  })
});

// router.get('/add', (req, res) => {
//     res.render('plants/add');
//   }).catch(err => {
//     console.log(err);
//   })
  router.get('/add', (req, res, next) => {
    res.render('plants/add');
  });

router.get('/:plantId', (req, res) => {
  const plantId = req.params.plantId;
  Plant.findById(plantId).then(plant => {
    res.render('plants/plantDetails', { plant: plant });
  }).catch(err => {
    console.log(err);
  });
});

router.post('/index', (req, res) => {
  console.log(req.body);
  // const title = req.body.title;
  // const author = req.body.author;
  // const description = req.body.description;
  // const rating = req.body.rating;
  const { species, size, description } = req.body;
  Plant.create({
    species,
    size,
    description,
    owner: req.user._id
  }).then(plant => {
    console.log(`Success! ${species} was added to the database.`);
    res.redirect(`/plants/myplants`);
    // res.redirect(`/${book._id}`);
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

// router.post('/books/:bookId/reviews', (req, res) => {
//   const { user, comment } = req.body;
//   Book.update({ _id: req.params.bookId }, { $push: { reviews: { user: user, comment: comment } } })
//     .then(book => {
//       res.redirect('/books');
//     })
//     .catch(err => {
//       console.log(err);
//     })
// })

module.exports = router;