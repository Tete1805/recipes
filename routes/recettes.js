var express = require('express');
var router = express.Router();
var Recette = require('../models/recette');

router.get(['/', '/all'], function(req, res, next) {
  res.render('recettes/all');
});

router.get('/new', function(req, res, next) {
  res.render('recettes/new', { recette: { nom: 'Nouvelle recette' }});
});

router.post('/new', function(req, res, next) {
  var recette = new Recette();
  recette.nom = req.body.nom;
  recette.auteur = req.user;
  recette.save(function(err) {
    console.log('error while saving recette');
  })
  res.redirect('/recettes/all');
})

router.get('/my', function(req, res, next) {
  res.render('recettes/my', { title: 'Toutes mes recettes '});
});

module.exports = router;
