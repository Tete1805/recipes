var express = require('express');
var router = express.Router();
var Recette = require('../models/recette');
var authRequired = require('./authRequired');

router.get('/recettes', function(req, res, next) {
  Recette.find().populate('auteur').exec((err, results) => {
    res.render('admin/recettes', { title: 'Admin recettes', recettes: results });
  })
});

module.exports = router;
