var express = require('express');
var router = express.Router();
var recettes = require('../models/recettes');

router.get(['/', '/all'], recettes, function(req, res, next) {
  console.log('routes/recettes');
  res.render('recettes/all', { title: 'Toutes les recettes '});
});

router.get('/new', function(req, res, next) {
  res.render('recettes/new', { title: 'Nouvelle recette '});
});

router.get('/my', function(req, res, next) {
  res.render('recettes/my', { title: 'Toutes mes recettes '});
});

module.exports = router;
