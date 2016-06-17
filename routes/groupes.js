var express = require('express');
var router = express.Router();
var passport = require('passport');
var authRequired = require('./authRequired');

router.get(['/', '/all'], function(req, res, next) {
  res.render('groupes/all', { title: 'Tous les groupes '});
});

router.get('/new', authRequired, function(req, res, next) {
  res.render('groupes/new', { title: 'Nouveau groupe '});
});

router.get('/my', authRequired, function(req, res, next) {
  res.render('groupes/my', { title: 'Tous mes groupes '});
});

module.exports = router;
