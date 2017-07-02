const express = require('express');
const router = express.Router();
const Arome = require('../models/arome');
const Recette = require('../models/recette');
const User = require('../models/user');
const authRequired = require('./authRequired');

router.get('/profile/:pseudo', authRequired, function(req, res, next) {
  Promise.all([
    User.find({ 'local.pseudo': req.params.pseudo }).exec(),
    Recette.find({ 'auteur': req.params.pseudo }).exec(),
    Arome.find({ 'users': req.params.pseudo }).exec(),
    Recette.find({ 'likes': req.params.pseudo }).exec()
  ]).then(function(result) {
    res.render('users/profile', { title: 'Profil', userDetails: result[0], recettes: result[1], aromes: result[2], liked: result[3] });
  })

});

module.exports = router;
