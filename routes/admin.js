var express = require('express');
var router = express.Router();
var Arome = require('../models/arome');
var Recette = require('../models/recette');
var User = require('../models/user');
var authRequired = require('./authRequired');

router.get('/recettes', authRequired, function(req, res, next) {
  Recette.find().exec((err, results) => {
    res.render('admin/recettes', { title: 'Admin recettes', recettes: results });
  })
});

router.get('/users', authRequired, function(req, res, next) {
  User.find().sort('level').sort('ajoute').exec((err, results) => {
    res.render('admin/users', { title: 'Admin users', users: results });
  })
});

router.get('/aromes', authRequired, function(req, res, next) {
  Arome.find().sort('marque').exec((err, results) => {
    res.render('admin/aromes', { title: 'Admin aromes', aromes: results });
  })
});

module.exports = router;
