var express = require('express');
var router = express.Router();
var Arome = require('../models/arome');

router.get(['/', '/all'], function(req, res, next) {

  Arome.find().limit(10).exec(function(err, results) {
    console.log (results);
    res.render('aromes/all', {
     title: 'Tous les arômes',
     aromes: results
   });
  });

});

router.get('/all/:page', function(req, res, next) {

  Arome.find().skip((req.query.page || 0) * 10).limit(10).exec(function(err, results) {
    console.log (results);
    res.render('aromes/all', {
     title: 'Tous les arômes',
     aromes: results
   });
  });

});

router.get('/new', function(req, res, next) {
  res.render('aromes/new', { title: 'Nouvel arôme '});
});

router.post('/new', function(req, res, next) {
  var arome = new Arome();
  console.log(req.body.marque)
  arome.marque = req.body.marque;
  arome.nom = req.body.nom;
  arome.description = req.body.description;
  arome.save(function(err) {
    if(err) { 
      console.log('error while saving arome'); 
    }
  })
  res.redirect('/aromes/all');
})

router.get('/my', function(req, res, next) {
  res.render('aromes/my', { title: 'Tous mes arômes '});
});

module.exports = router;
