var express = require('express'),
      router = express.Router(),
      Recette = require('../models/recette'),
      Arome = require('../models/arome'),
      authRequired = require('./authRequired');

router.use('/:id', (req, res, next) => {
  Recette.findOne({ "_id": req.params.id }).populate('auteur').exec((err, result) => {
    req.recette = err ? new Recette() : result;
    next();
  })  
});

router.get('/:id/delete', (req, res, next) => {
  req.recette.remove();
  res.redirect('/admin/recettes');  
});

router.get('/:id/detail', (req, res, next) => {
  res.render('recettes/detail', { title: 'Détail de la recette', recette: req.recette });  
})

router.get('/:id/edit', authRequired, (req, res, next) => {
  res.render('recettes/edit', { title: 'Modifiez la recette', recette: req.recette });  
});

router.post('/:id/edit', authRequired, (req, res, next) => {
  Arome.updateWithReq(req);
  req.recette.parse(req).save((err) => {
      if (err) { req.flash('error', "Je n'ai pas réussi à sauver la recette. =/")}
      res.redirect('/recettes/');
    } 
  );
});

router.get('/:id/fork', authRequired, (req, res, next) => {
  req.recette.auteur = req.user;
  req.recette._id = null;
  res.render('recettes/edit', { title: 'Sauvegardez une copie de la recette', recette: req.recette }); 
});

router.post('/:id/comment', authRequired, (req, res, next) => {
  req.recette.update({ $push: { comments: { auteur: req.user, corps: req.body.commentaire }}}).exec((err) => {
    if (err) { req.flash('error', 'error while saving comment for recette: ' + err); }
    res.redirect('/' + req.params.id + '/detail');
  });
});

module.exports = router;