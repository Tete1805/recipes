const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { Profile } = require('../services/profile');
const authRequired = require('./authRequired');

router.get(['/', '/:pseudo'], async (req, res, next) => {
  const pseudo = req.params.pseudo || req.user.local.pseudo;
  const profileService = new Profile(pseudo);
  try {
    const profile = await profileService.getProfile();
    res.render('profile', { title: 'Profil', profile });
  } catch (exception) {
    next(exception);
  }
});

router.post('/:pseudo', authRequired, async (req, res) => {
  const { pseudo } = req.params;
  const { pseudo: currentUser } = req.user.local;
  if (currentUser != pseudo) {
    throw new Error('Vous ne pouvez modifier que votre profil.');
  } else {
    try {
      const user = await User.findOne({ 'local.pseudo': pseudo }).exec();
      await user.updateOne({
        email: req.body.email,
        avatar: req.body.avatar
      });
      req.flash('info', 'Profil sauvegardé.');
    } catch (e) {
      req.flash('error', "Je n'ai pas réussi à sauver le profil. \n" + e);
    }
    res.redirect('/profile/' + pseudo);
  }
});

module.exports = router;
