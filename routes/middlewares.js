  
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
  module.exports = {
    loginCheck
  };