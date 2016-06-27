var express = require('express'),
      router = express.Router(),
      Recette = require('../models/recette'),
      Arome = require('../models/arome'),
      authRequired = require('./authRequired'),
      bitly = require('../config/bitly');

router.get(['/', '/all', '/all/:page'], (req, res, next) => {
  Recette.find().populate('auteur').skip((req.query.page || 0) * 10).limit(10).exec((err, results) => {
    res.render('recettes/all', { title: 'Toutes les recettes', recettes: results });
  });
});

router.get('/search/:searchType/:searchItem', (req, res, next) => {
  var recettes = Recette.find({ "$or": [{ "hashtags" : "#" + req.params.searchItem }, { "aromes.nom": req.params.searchItem }]});
  recettes.populate('auteur').skip((req.query.page || 0) * 10).limit(10).exec((err, results) => {
    res.render('recettes/all', { title: 'Toutes les recettes contenant ' + req.params.searchItem, recettes: results });
  });
});

router.get('/my', authRequired, (req, res, next) => {
  Recette.find({ auteur: req.user }).populate('auteur').exec((err, results) => {
    res.render('recettes/my', { title: 'Toutes mes recettes', recettes: results });
  });
});

module.exports = router;
