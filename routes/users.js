var express  = require('express');
var router   = express.Router();
var passport = require('passport');
var authRequired = require('./authRequired');

router.get('/login', function(req, res, next) {
  // Si l'utilisateur arrive ici déjà authentifié pour une raison ou une autre, on le renvoie vers son profil
  // Sinon, on stocke dans la session le referer pour le renvoyer après le post
  if (req.isAuthenticated()) {
    res.render('users/profile');
  } else {
    req.session.redirectTo = req.session.redirectTo || req.header("Referer") || '/users/profile';
    res.render('users/login');
  }
});

router.post('/login', (req, res, next) => {

  // Quand l'utilisateur s'authentifie, on le renvoie vers la page de retour calculée dans le get initial
  var redirectTo = req.session.redirectTo || '/login';
  delete req.session.redirectTo;
  passport.authenticate('local-login',
    { successRedirect: redirectTo,
    failureRedirect: '/users/login',
    failureFlash: true }
  )(req, res, next)
})

router.get('/signup', function(req, res, next) {
  // Si l'utilisateur arrive ici déjà authentifié pour une raison ou une autre, on le renvoie vers son profil
  if (req.isAuthenticated()) {
    res.redirect('profile');
  } else {
    res.render('users/signup');
  }
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/users/profile', // redirect to the secure profile section
    failureRedirect : '/users/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

router.get('/profile', authRequired, function(req, res, next) {
    res.redirect('/user/profile/' + req.user.local.pseudo)
});

module.exports = router;