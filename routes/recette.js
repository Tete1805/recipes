const express = require('express');
const router = express.Router();
const authRequired = require('./authRequired');
const { RecetteService } = require('../services/recette');
const aromeService = require('../services/arome');

router.get('/new', async (req, res) => {
  const recette = await RecetteService.findByIdOrDefault();
  res.render('recettes/edit', {
    title: 'Nouvelle recette',
    recette
  });
});

router.use(['/:id', '/:id/*'], async (req, res, next) => {
  req.recette = await RecetteService.findByIdOrDefault(req.params.id);
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

router.post('/', authRequired, async (req, res) => {
  const { _id } = req.body;
  aromeService.upsert(req.body);
  const recette = await RecetteService.update({
    id: _id || null,
    data: req.body,
    auteur: req.user.local.pseudo
  });
  res.redirect('/recette/' + recette._id);
});

router.post('/:id/comment', authRequired, (req, res) => {
  RecetteService.comment(req.recette, req.user.local.pseudo, req.body.comment);
  res.redirect('/recette/' + req.params.id);
});

module.exports = router;
