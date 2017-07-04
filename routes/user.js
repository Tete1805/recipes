const express = require('express');
const router = express.Router();
const Arome = require('../models/arome');
const Recette = require('../models/recette');
const User = require('../models/user');
const authRequired = require('./authRequired');

router.get('/profile/:pseudo', authRequired, function(req, res, next) {
  Promise.all([
    User.findOne({ 'local.pseudo': req.params.pseudo }).exec(),
    Recette.find({ 'auteur': req.params.pseudo }).exec(),
    Arome.find({ 'users': req.params.pseudo }).exec(),
    Recette.find({ 'likes': req.params.pseudo }).exec()
  ]).then(function(result) {
    res.render('users/profile', { title: 'Profil', userDetails: result[0], recettes: result[1], aromes: result[2], liked: result[3] });
  })
});

router.post('/profile/:pseudo', authRequired, function(req, res, next) {
    if (req.user.local.pseudo != req.params.pseudo) {
      throw new Error("Vous ne pouvez pas modifier un profil autre que le vôtre. =/");
      next();
    } else {
      User.findOne({ 'local.pseudo': req.params.pseudo }).exec(function(err, result) {
          result.update({ "email": req.body.email }, function(err) {
            if (err) {
              req.flash('error', 'error while saving comment for recette: ' + err)
            } else {
              req.flash('info', 'Profil sauvegardé ! :)')
            }
            res.redirect('/user/profile/' + req.user.local.pseudo);
          })
        })
      }
});

module.exports = router;
