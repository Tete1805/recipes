const express = require('express');
const router = express.Router();
const User = require('../models/user');
const profileService = require('../services/profile');
const authRequired = require('./authRequired');

router.get(['/', '/:pseudo'], authRequired, async (req, res) => {
  const pseudo = req.params.pseudo || req.user.local.pseudo;
  const profile = await profileService.getProfile(pseudo);
  res.render('profile', { title: 'Profil', profile });
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
      await user.updateOne({
        email: req.body.email,
        avatar: req.body.avatar
      });
      req.flash('info', 'Profil sauvegardé ! :)');
    } catch (e) {
      req.flash('error', "Je n'ai pas réussi à sauver le profil. \n" + e);
    }
    res.redirect('/profile/' + pseudo);
  }
});

module.exports = router;
