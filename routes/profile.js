const express = require('express');
const router = express.Router();
const { Profile } = require('../services/profile');
const authRequired = require('./authRequired');

router.get('/', authRequired);

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

router.post(['/', '/:pseudo'], authRequired, async (req, res) => {
  const pseudo = req.params.pseudo || req.user.local.pseudo;
  const { pseudo: currentUser } = req.user.local;
  if (currentUser != pseudo) {
    throw new Error('Vous pouvez seulement modifier votre profil.');
  } else {
    try {
      const profileService = new Profile(pseudo);
      await profileService.update(req.body);
      res.redirect('/profile/' + pseudo);
    } catch (exception) {
      throw new Error("Je n'ai pas réussi à sauver le profil. \n" + exception);
    }
  }
});

module.exports = router;
