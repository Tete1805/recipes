var express = require('express'),
  router = express.Router(),
  authRequired = require('./authRequired'),
  recetteService = require('../services/recette'),
  aromeService = require('../services/arome');

router.use(['/:id', '/:id/*'], async (req, res, next) => {
  req.recette = await recetteService.findByIdOrDefault(req.params.id);
  next();
});

router.get(['/:id', '/:id/detail'], (req, res) => {
  res.render('recettes/detail', {
    title: 'Détail de la recette',
    recette: req.recette
  });
});

router.get('/:id/edit', authRequired, (req, res) => {
  res.render('recettes/edit', {
    title: 'Modifiez la recette',
    recette: req.recette
  });
});

router.get('/:id/fork', authRequired, (req, res) => {
  req.recette.auteur = req.user.local.pseudo;
  req.recette._id = null;
  res.render('recettes/edit', {
    title: 'Sauvegardez une copie de la recette',
    recette: req.recette
  });
});

router.post(['/:id/edit', '/:id/fork'], authRequired, (req, res) => {
  aromeService.upsert(req.recette);
  recetteService.update(req.recette, req.body, req.user.local.pseudo);
  res.redirect('/recette/' + req.recette._id);
});

router.post('/:id/like', (req, res) => {
  recetteService.like(req.recette, req.user.local.pseudo);
  res.status(200).send('Merci !');
});

router.post('/:id/unlike', (req, res) => {
  recetteService.unlike(req.recette, req.user.local.pseudo);
  res.status(200).send('Dommage !');
});

router.post('/:id/comment', authRequired, (req, res) => {
  recetteService.comment(req.recette, req.user.local.pseudo, req.body.comment);
  res.redirect('/recette/' + req.params.id + '/detail');
});

module.exports = router;
