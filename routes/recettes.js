var express = require('express');
var router = express.Router();
var recettes = require('../models/recettes');

router.get(['/', '/all'], recettes, function(req, res, next) {
  console.log('routes/recettes');
  res.render('recettes/all');
});

router.get('/new', function(req, res, next) {
  res.render('recettes/new');
});

router.get('/my', function(req, res, next) {
  res.render('recettes/my');
});

module.exports = router;
