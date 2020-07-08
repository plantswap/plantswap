const express = require('express');
// //cloudinary 
const Plant = require("../models/Plant.js");
const uploadCloud = require("../config/cloudinary.js");

const router = express.Router(); 



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

router.get('/', (req, res, next) => {
  const user = req.user;
  res.render('index', { user: user });
});

router.get('/profile', loginCheck(), (req, res) => {
  
  const user = req.user;
  res.render('profile',{user: user});
});

module.exports = router;


