const express = require('express');
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

// router.get('profile/edit/:userId', (req, res) => {
//   const user = req.user;
//   User.findById(req.params.userId)
//     .then(userfound => {
//       res.render('userEdit', { user: user })
//     }).catch(err => {
//       console.log(err);
//     });
// })

// router.post('profile/edit/:userId', (req, res) => {
//   const user = req.user;
//   const {country, city, zip, street, house} = req.body;
//   User.findByIdAndUpdate(req.params.userId, {
//     name,
//     country, 
//     city, 
//     zip, 
//     street, 
//     house
//   })
//     .then(userupdated => {
//       res.redirect(`/profile`);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// })

router.get('/', (req, res, next) => {
  const user = req.user;
  res.render('index', { user: user });
});

router.get('/profile', loginCheck(), (req, res) => {
  const user = req.user;
  res.render('profile',{user: user});
});

module.exports = router;
