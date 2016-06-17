const express = require('express');
const router = express.Router();
const Recette = require('../models/recette');
var authRequired = require('./authRequired');

router.get(['/', '/all', '/all/:page'], (req, res, next) => {
  Recette.find().populate('auteur').skip((req.query.page || 0) * 10).limit(10).exec((err, results) => {
    res.render('recettes/all', { title: 'Toutes les recettes', recettes: results });
  });
});

router.get('/search/hashtag/:hashtag', (req, res, next) => {
  Recette.find({ "hashtags" : '#' + req.params.hashtag }).populate('auteur').skip((req.query.page || 0) * 10).limit(10).exec((err, results) => {
    res.render('recettes/all', { title: 'Toutes les recettes', recettes: results });
  });
});

router.get('/detail/:id', (req, res, next) => {
  Recette.findOne({ "_id": req.params.id }).exec((err, result) => {
    res.render('recettes/detail', { title: 'Détail de la recette', recette: result });  
  })  
});

router.post('/detail/:id', authRequired, (req, res, next) => {
  Recette.findOne({ "_id" : req.params.id }).exec((err, result) => {
     result.parse(req).save((err) => {
      if (err) { console.log('error while saving recette: ' + err); }
      res.redirect('/recettes/all');
    });
  });
})

router.get('/new', authRequired, (req, res, next) => {
  res.render('recettes/new', { title: 'Nouvelle recette', recette: { nom: 'Nom de la nouvelle recette' }});   
});

router.post('/new', authRequired, (req, res, next) => {
  var recette = new Recette();
  recette.parse(req).save(function(err) {
    if (err) { console.log('error while saving recette: ' + err); }
  });
  res.redirect('/recettes/all');
})

router.get('/my', authRequired, (req, res, next) => {
  Recette.find({ auteur: req.user }).populate('auteur').exec((err, results) => {
    res.render('recettes/my', { title: 'Toutes mes recettes', recettes: results });
  });
});

module.exports = router;
