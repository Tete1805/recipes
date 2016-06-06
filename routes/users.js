var express  = require('express');
var router   = express.Router();
var passport = require('passport');

router.get('/login', function(req, res, next) {
  res.render('users/login');
});

router.post('/login', passport.authenticate('local-login', {
        successRedirect : '/users/profile', // redirect to the secure profile section
        failureRedirect : '/users/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

router.get('/signup', function(req, res, next) {
  res.render('users/signup');
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/users/profile', // redirect to the secure profile section
    failureRedirect : '/users/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

router.get('/profile', isAuthenticated, function(req, res, next) {
    res.render('users/profile');
});

function isAuthenticated(req, res, next) {
      // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/users/login');
}

module.exports = router;