var express = require('express');
var router = express.Router();
var recettes = require('../models/recettes');

router.use(recettes);

router.get(['/', '/all'], function(req, res, next) {
  console.log('routes/recettes/all');
  res.render('recettes/all');
});

router.get('/new', function(req, res, next) {
  res.locals.recipe = req.recipe;
  console.log('routes/recettes/new', req.recipe);
  res.render('recettes/new');
});

router.get('/my', function(req, res, next) {
  res.render('recettes/my');
});

module.exports = router;
