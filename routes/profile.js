const express = require('express');
const router = express.Router();
const Arome = require('../models/arome');
const Recette = require('../models/recette');
const User = require('../models/user');
const authRequired = require('./authRequired');

router.get('/:pseudo', authRequired, async (req, res) => {
  const { pseudo } = req.params;
  const userDetails = await User.findOne({ 'local.pseudo': pseudo }).exec();
  const recettes = await Recette.find({ auteur: pseudo }).exec();
  const aromes = await Arome.find({ users: pseudo }).exec();
  const liked = await Recette.find({ likes: pseudo }).exec();
  res.render('users/profile', {
    title: 'Profil',
    userDetails,
    recettes,
    aromes,
    liked
  });
});

router.post('/:pseudo', authRequired, async (req, res) => {
  const { pseudo } = req.params;
  const { pseudo: currentUser } = req.user.local;
  if (currentUser != pseudo) {
    throw new Error(
      'Vous ne pouvez pas modifier un profil autre que le vôtre. =/'
    );
  } else {
    try {
      const user = await User.findOne({ 'local.pseudo': pseudo }).exec();
      await user.update({
        email: req.body.email,
        avatarUrl: req.body.avatarUrl
      });
    } catch (e) {
      req.flash('error', "Je n'ai pas réussi à sauver le profil. \n" + e);
    }
    req.flash('info', 'Profil sauvegardé ! :)');
    res.redirect('/user/profile/' + pseudo);
  }
});

module.exports = router;
