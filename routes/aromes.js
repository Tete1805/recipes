var express = require('express');
var router = express.Router();
var Arome = require('../models/arome');
var authRequired = require('./authRequired');

router.get(['/', '/all'], function(req, res, next) {
  Arome.find().sort('marque').limit(50).exec(function(err, results) {
    res.render('aromes/all', {
     title: 'Tous les arômes',
     aromes: results
   });
  });
});

router.get('/all/:page', function(req, res, next) {
  Arome.find().sort('marque').skip((req.query.page || 0) * 50).limit(50).exec(function(err, results) {
    res.render('aromes/all', {
     title: 'Tous les arômes',
     aromes: results
   });
  });
});

router.get('/new', authRequired, function(req, res, next) {
  res.render('aromes/new', { title: 'Nouvel arôme '});
});

router.post('/new', authRequired, function(req, res, next) {
  var arome = new Arome();
  arome.marque = req.body.marque;
  arome.nom = req.body.nom;
  arome.description = req.body.description;
  arome.save(function(err) {
    if(err) { 
      req.flash("Je n'ai pas réussi à sauvegarder l'arôme. =/"); 
    }
  });
  res.redirect('/aromes/all');
})

router.get('/my', authRequired, function(req, res, next) {
  res.render('aromes/my', { title: 'Tous mes arômes '});
});

module.exports = router;
