const express = require('express');
const router = express.Router();
const Arome = require('../models/arome');
const Recette = require('../models/recette');
const User = require('../models/user');
const adminRequired = require('./adminRequired');

router.get('/recettes', adminRequired, function(req, res, next) {
  Recette.find().exec((err, results) => {
    res.render('admin/recettes', { title: 'Admin recettes', recettes: results });
  })
});

router.get('/users', adminRequired, function(req, res, next) {
  User.find().sort('level').sort('ajoute').exec((err, results) => {
    res.render('admin/users', { title: 'Admin users', users: results });
  })
});

router.get('/aromes', adminRequired, function(req, res, next) {
  Arome.find().sort('marque').exec((err, results) => {
    res.render('admin/aromes', { title: 'Admin aromes', aromes: results });
  })
});

module.exports = router;
