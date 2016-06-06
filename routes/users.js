var express = require('express');
var router = express.Router();
var users = require('../models/users');

//mongodb://<dbuser>:<dbpassword>@ds013270.mlab.com:13270/recipes
router.get(['/login', '/logout'], users, function(req, res, next) {
  if(!req.query.username && !req.session.user) {
    res.render('users/login');
  } else {
    res.redirect('/users/profile');
  }
});

router.get('/profile', users, function(req, res, next) {
  if(!req.session.user) {
    res.redirect('/users/login');
  } else {
    res.locals.user = req.session.user;
    res.render('users/profile');
  }
});

module.exports = router;