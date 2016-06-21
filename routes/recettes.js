const express = require('express'),
      router = express.Router(),
      Recette = require('../models/recette'),
      authRequired = require('./authRequired'),
      bitly = require('../config/bitly');

router.get(['/', '/all', '/all/:page'], (req, res, next) => {
  Recette.find().populate('auteur').skip((req.query.page || 0) * 10).limit(10).exec((err, results) => {
    res.render('recettes/all', { title: 'Toutes les recettes', recettes: results });
  });
});

router.get('/search/:searchType/:searchItem', (req, res, next) => {

  var recettes = Recette.find({ "$or": [{ "hashtags" : "'#" + req.params.searchItem + "'" }, { "aromes.nom": req.params.searchItem }]});

  recettes.populate('auteur').skip((req.query.page || 0) * 10).limit(10).exec((err, results) => {
    res.render('recettes/all', { title: 'Toutes les recettes contenant ' + req.params.searchItem, recettes: results });
  });

});

router.get('/detail/:id', (req, res, next) => {
  Recette.findOne({ "_id": req.params.id }).exec((err, result) => {
    res.render('recettes/detail', { title: 'Nouvelle recette', recette: result });  
  })  
});

router.get('/fork/:id', authRequired, (req, res, next) => {
  Recette.findOne({ "_id": req.params.id }).exec((err, result) => {
    result.auteur = req.user;
    result._id = null;
    res.render('recettes/edit', { title: 'Modifiez la recette', recette: result });  
  })  
});

router.get('/edit/:id', authRequired, (req, res, next) => {
  Recette.findOne({ "_id": req.params.id }).exec((err, result) => {
    res.render('recettes/edit', { title: 'Modifiez la recette', recette: result });  
  })  
});

router.post('/edit/:id', authRequired, (req, res, next) => {
  Recette.findOne({ "_id": req.params.id }).exec((err, result) => {
    if (err) { result = new Recette() }
    bitly.shorten('http://diyrecipes.herokuapp.com/recettes/detail/' + result._id)
      .then((result) => {
        req.shortUrl = result.data.url;
      })
      .then(function() {
        result.parse(req).save((err) => {
          if (err) { console.log('error while saving recette: ' + err); }
          res.redirect('/recettes/all');
        });
      });
    });
});

router.get('/new', authRequired, (req, res, next) => {
  res.render('recettes/new', { title: 'Nouvelle recette', recette: { nom: 'Nom de la nouvelle recette' }});   
});

router.post('/new', authRequired, (req, res, next) => {
  var recette = new Recette();
  bitly.shorten('http://diyrecipes.herokuapp.com/recettes/detail/' + recette._id)
    .then((result) => {
      req.shortUrl = result.data.url;
    })
    .then(function() {
      recette.parse(req).save(function(err) {
        if (err) { console.log('error while saving recette: ' + err); }
      });
      res.redirect('/recettes/all');
    });
});

router.get('/my', authRequired, (req, res, next) => {
  Recette.find({ auteur: req.user }).populate('auteur').exec((err, results) => {
    res.render('recettes/my', { title: 'Toutes mes recettes', recettes: results });
  });
});

module.exports = router;
