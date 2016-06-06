var express = require('express');
var router = express.Router();
var groupes = require('../models/groupes');

router.get(['/', '/all'], groupes, function(req, res, next) {
  res.render('groupes/all', { title: 'Tous les groupes '});
});

router.get('/new', function(req, res, next) {
  res.render('groupes/new', { title: 'Nouveau groupe '});
});

router.get('/my', function(req, res, next) {
  res.render('groupes/my', { title: 'Tous mes groupes '});
});

module.exports = router;
