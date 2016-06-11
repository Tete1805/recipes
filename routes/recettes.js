var express = require('express');
var router = express.Router();
var Recette = require('../models/recette');

router.get(['/', '/all'], function(req, res, next) {
  Recette.find().populate('auteur').limit(10).exec(function(err, results) {
    res.render('recettes/all', {
     title: 'Toutes les recettes',
     recettes: results
   });
  });
});

router.get('/all/:page', function(req, res, next) {
  Recette.find().skip((req.query.page || 0) * 10).limit(10).exec(function(err, results) {
    res.render('recettes/all', {
     title: 'Toutes les recettes',
     recettes: results
   });
  });
});

router.get('/new', function(req, res, next) {
  res.render('recettes/new', { title: 'Nouvelle recette', recette: { nom: 'Nom de la nouvelle recette' }});
});

router.post('/new', function(req, res, next) {
  var recette = new Recette({
    nom: req.body.nom,
    auteur: req.user,
    notes: req.body.notes,
    hashtags:req.body.tags.replace(/[^a-zA-Z0-9\#\s]*/g, '').split(' ').filter(function(elm) { return elm.length > 0 ? true : false })
  });
  recette.save(function(err) {
    if (err) { console.log('error while saving recette: ' + err); }
  })
  res.redirect('/recettes/all');
})

router.get('/my', function(req, res, next) {
  Recette.find({ auteur: req.user }).exec(function(err, results) {
    res.render('recettes/my', {
     title: 'Toutes mes recettes',
     recettes: results
   });
  });
});

module.exports = router;
