const express = require('express');
const router = express.Router();
const passport = require('passport');
const authRequired = require('./authRequired');

router.get('/login', function(req, res) {
  // Si l'utilisateur arrive ici déjà authentifié pour une raison ou une autre, on le renvoie vers son profil
  // Sinon, on stocke dans la session le referer pour le renvoyer après le post
  if (req.isAuthenticated()) {
    res.redirect('profile');
  } else {
    req.session.redirectTo =
      req.session.redirectTo || req.header('Referer') || '/profile';
    res.render('authentication/login');
  }
});

router.post('/login', (req, res, next) => {
  // Quand l'utilisateur s'authentifie, on le renvoie vers la page de retour calculée dans le get initial
  const redirectTo = req.session.redirectTo || '/login';
  delete req.session.redirectTo;
  passport.authenticate('local-login', {
    successRedirect: redirectTo,
    failureRedirect: '/authentication/login',
    failureFlash: true
  })(req, res, next);
});

router.get('/signup', function(req, res) {
  // Si l'utilisateur arrive ici déjà authentifié pour une raison ou une autre, on le renvoie vers son profil
  if (req.isAuthenticated()) {
    res.redirect('profile');
  } else {
    res.render('authentication/signup');
  }
});

router.post(
  '/signup',
  passport.authenticate('local-signup', {
    successRedirect: '/authentication/profile', // redirect to the secure profile section
    failureRedirect: '/authentication/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  })
);

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/profile', authRequired, function(req, res) {
  res.redirect('/profile/' + req.user.local.pseudo);
});

module.exports = router;
