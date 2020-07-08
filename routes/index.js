const express = require('express');
const uploadCloud = require("../config/cloudinary.js");
const router = express.Router(); 
const User = require('../models/User');


//no login check in the index page
const loginCheck = () => {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/auth/login');
    }
  };
};

router.get('/profile/:userId/edit', (req, res) => {
  const user = req.user;
  User.findById(req.params.userId)
    .then(userfound => {
      res.render('userEdit', { user: user })
    }).catch(err => {
      console.log(err);
    });
})

router.post('/profile/edit/:userId', (req, res) => {
  const user = req.user;
console.log(user)
  const {country, city, zip, street, house} = req.body;
  User.findByIdAndUpdate(req.params.userId, {
    country, 
    city, 
    zip, 
    street,
    house
  })
    .then(userupdated => {
      res.redirect(`/profile`);
    })
    .catch(err => {
      console.log(err);
    });
})

router.get('/profiles/:userId', (req, res) => {
  const user = req.user;
  const differentUser = req.params.userId;
  User.findById(req.params.userId)
    .then(userfound => {
      res.render('profileExt', { userExt: userfound, user: user})
    }).catch(err => {
      console.log(err);
    });
})

router.get('/', (req, res, next) => {
  const user = req.user;
  res.render('index', { user: user });
});

router.get('/profile', loginCheck(), (req, res) => {
  const user = req.user;
  res.render('profile',{user: user});
});

module.exports = router;


