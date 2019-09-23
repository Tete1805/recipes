var express = require('express'),
  router = express.Router(),
  Arome = require('../models/arome'),
  authRequired = require('./authRequired'),
  recetteService = require('../services/recette');

router.use(['/:id', '/:id/*'], async (req, res, next) => {
  req.recette = await recetteService.findByIdOrDefault(req.params.id);
  next();
});

router.get(['/:id', '/:id/detail'], (req, res, next) => {
  res.render('recettes/detail', {
    title: 'Détail de la recette',
    recette: req.recette
  });
});

router.get('/:id/edit', authRequired, (req, res, next) => {
  res.render('recettes/edit', {
    title: 'Modifiez la recette',
    recette: req.recette
  });
});

router.post(['/:id/edit', '/:id/fork'], authRequired, (req, res, next) => {
  Arome.updateWithReq(req);
  req.recette.parse(req).save(err => {
    if (err) {
      req.flash('error', "Je n'ai pas réussi à sauver la recette. =/");
    }
    res.redirect('/recettes/search/auteur/' + req.user.local.pseudo + '/1');
  });
});

router.post('/:id/like', (req, res, next) => {
  req.recette.like(req.user.local.pseudo).save(err => {
    res.status(200).send('Merci !');
  });
});

router.get('/:id/fork', authRequired, (req, res, next) => {
  req.recette.auteur = req.user.local.pseudo;
  req.recette._id = null;
  res.render('recettes/edit', {
    title: 'Sauvegardez une copie de la recette',
    recette: req.recette
  });
});

router.post('/:id/comment', authRequired, (req, res, next) => {
  req.recette
    .update({
      $push: {
        comments: { auteur: req.user.local.pseudo, corps: req.body.comment }
      }
    })
    .exec(err => {
      if (err) {
        req.flash('error', 'error while saving comment for recette: ' + err);
      }
      res.redirect('/recette/' + req.params.id + '/detail');
    });
});

module.exports = router;
