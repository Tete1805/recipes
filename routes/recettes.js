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
  Recette.find().populate('auteur').skip((req.query.page || 0) * 10).limit(10).exec(function(err, results) {
    res.render('recettes/all', {
     title: 'Toutes les recettes',
     recettes: results
   });
  });
});

router.get('/detail/:id', function(req, res, next) {
  Recette.findOne({ "_id": req.params.id }).exec((err, results) => {
    res.render('recettes/detail', { title: 'Nouvelle recette', recette: results });  
  })  
});

router.get('/new', function(req, res, next) {
  res.render('recettes/new', { title: 'Nouvelle recette', recette: { nom: 'Nom de la nouvelle recette' }});
});

router.post('/new', function(req, res, next) {

  var recette = new Recette({
    nom: req.body.nom,
    auteur: req.user,
    notes: req.body.notes,
    hashtags:req.body.hashtags.replace(/[^a-zA-Z0-9\#\s]*/g, '').split(' ').filter(function(elm) { return elm.length > 0 ? true : false })
  });

  var multiplesBases = typeof req.body['base-ratio'] !== 'string';
  var multiplesAromes = typeof req.body['arome-marque'] !== 'string';

  if (multiplesBases) {
    for (var i = 0; i < req.body['base-ratio'].length; i++) {
      recette.bases.push({
        ratio: req.body['base-ratio'][i],
        nicotine: req.body['base-nicotine'][i],
        pourcentage: req.body['base-pourcentage'][i]
      })
    }
  } else {
      recette.bases.push({
        ratio: req.body['base-ratio'],
        nicotine: req.body['base-nicotine'],
        pourcentage: req.body['base-pourcentage']
      })
  }

  if (multiplesAromes) {
    for (var i = 0; i < req.body['arome-marque'].length; i++) {
      recette.aromes.push({
        marque: req.body['arome-marque'][i],
        nom: req.body['arome-nom'][i],
        pourcentage: req.body['arome-pourcentage'][i]
      })
    }
  } else {
      recette.aromes.push({
        marque: req.body['arome-marque'],
        nom: req.body['arome-nom'],
        pourcentage: req.body['arome-pourcentage']
      });
  }

  recette.save(function(err) {
    if (err) { console.log('error while saving recette: ' + err); }
  })
  res.redirect('/recettes/all');
})

router.get('/my', function(req, res, next) {
  Recette.find({ auteur: req.user }).populate('auteur').exec(function(err, results) {
    res.render('recettes/my', {
     title: 'Toutes mes recettes',
     recettes: results
   });
  });
});

module.exports = router;
