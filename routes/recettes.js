var express       = require('express'),
    router        = express.Router(),
    authRequired  = require('./authRequired'),
    Recette       = require('../models/recette'); 

router.get(['/', '/all/:page'], (req, res, next) => {

  Recette.find().skip(10 * (parseInt(req.params.page, 10) - 1 || 0)).limit(10).exec((err, results) => {
      res.render('recettes/all', { recettes: results, page: req.params.page })
    });  
})

router.get(['/search/:searchField/:searchString/', '/search/:searchField/:searchString/:page'], (req, res, next) => {

  var search = {};

  if (!(req.params.searchField && req.params.searchString)) {
    throw new Error("Vous devez spécifier des valeurs de recherche ! :) Et d'ailleurs... Mais comment êtes-vous arrivés ici ?")
  }

  if (req.params.searchField === 'auteur') {
    search[req.params.searchField] = req.params.searchString;
  }

  else if (req.params.searchField !== "all") {
    search[req.params.searchField] = { $regex: req.params.searchString, $options: 'gi' };

  } else {
    search = { "$or": 
      [
        { hashtags : { $regex: req.params.searchString, $options: 'gi' }},
        { "aromes.nom": { $regex: req.params.searchString, $options: 'gi' }},
        { "aromes.marque": { $regex: req.params.searchString, $options: 'gi' }},
        { notes: { $regex: req.params.searchString, $options: 'gi' }},
        { auteur : req.params.searchString }
      ]
    }
  }

  Recette
      .find(search)
      .skip(10 * (parseInt(req.params.page, 10) - 1 || 0))
      .limit(10)
      .exec((err, results) => {
        res.render('recettes/all', { recettes: results, page: req.params.page })
      });  
});

module.exports = router;