const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  const user = req.user;
  res.render('index', { user: user });
});

// create a middleware that checks if a user is logged in

const loginCheck = () => {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/auth/login');
    }
  };
};

router.get('/myplants', loginCheck(), (req, res) => {
  res.render('myplants');
});

router.get('/profile', loginCheck(), (req, res) => {
  res.render('profile');
});

module.exports = router;
