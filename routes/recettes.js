var express = require('express');
var router = express.Router();
var Recette = require('../models/recette');

router.get(['/', '/all'], function(req, res, next) {
  Recette.find().populate('auteur').limit(10).exec(function(err, results) {
    res.render('recettes/all', { title: 'Toutes les recettes', recettes: results });
  });
});

router.get('/all/:page', function(req, res, next) {
  Recette.find().populate('auteur').skip((req.query.page || 0) * 10).limit(10).exec(function(err, results) {
    res.render('recettes/all', { title: 'Toutes les recettes', recettes: results });
  });
});

router.get('/detail/:id', function(req, res, next) {
  Recette.findOne({ "_id": req.params.id }).exec((err, result) => {
    res.render('recettes/detail', { title: 'Détail de la recette', recette: result });  
  })  
});

router.post('/detail/:id', function(req, res, next) {
  Recette.findOne({ "_id" : req.params.id }).exec((err, result) => {
     result.parse(req).save((err) => {
      if (err) { console.log('error while saving recette: ' + err); }
      res.redirect('/recettes/all');
    });
  });
})

router.get('/new', function(req, res, next) {
  res.render('recettes/new', { title: 'Nouvelle recette', recette: { nom: 'Nom de la nouvelle recette' }});
});

router.post('/new', function(req, res, next) {
  var recette = new Recette();
  recette.parse(req).save(function(err) {
    if (err) { console.log('error while saving recette: ' + err); }
  });
  res.redirect('/recettes/all');
})

router.get('/my', function(req, res, next) {
  Recette.find({ auteur: req.user }).populate('auteur').exec(function(err, results) {
    res.render('recettes/my', { title: 'Toutes mes recettes', recettes: results });
  });
});

module.exports = router;
