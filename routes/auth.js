const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true,
    passReqToCallback: true
  })
)

router.post('/signup', (req, res, next) => {
  const { username, password, country, zip, street, house} = req.body;

  if (password.length < 8) {
    console.log("password too short")
    res.render('auth/signup', {
      message: 'Your password must have at least 8 characters.'
    });
    return;
  }
  if (username === '') {
    console.log("no username wirth notmal name")
    res.render('auth/signup', { message: 'Please define a username.' });
    return;
  }

  User.findOne({ username: username }).then(found => {
    console.log(found,"found user")
    if (found == null) {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(password, salt);
      User.create({ 
        username: username, 
        password: hash,
        country: country,
        zip: zip,
        street: street,
        house: house
       })
        .then(dbUser => {
          console.log(dbUser,"user created")
          req.login(dbUser, err => {
            if (err) next(err);
            else res.redirect('/');
          });
        })
        .catch(err => {
          next(err);
        });
    } else {
      console.log("mistakes were made")
      res.render('auth/signup', { message: 'username taken' });
    }
      
  }).catch(err=>{
    console.log(err)
  });
});


router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;