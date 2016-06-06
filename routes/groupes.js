var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get(['/', '/all'], function(req, res, next) {
  res.render('groupes/all', { title: 'Tous les groupes '});
});

router.get('/new', function(req, res, next) {
  res.render('groupes/new', { title: 'Nouveau groupe '});
});

router.get('/my', function(req, res, next) {
  res.render('groupes/my', { title: 'Tous mes groupes '});
});

module.exports = router;
