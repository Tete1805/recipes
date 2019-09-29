const express = require('express');
const router = express.Router();
const authRequired = require('./authRequired');
const { RecetteService } = require('../services/recette');

router.get('/', authRequired, create);
router.get('/:id', get);
router.post('/', authRequired, post);
router.post('/:id', authRequired, edit);

module.exports = router;

function create(req, res) {
  const recette = RecetteService.getDefault();
  res.render('recettes/edit', { title: 'Nouvelle recette', recette });
}

async function get(req, res) {
  const recette = await RecetteService.findById(req.params.id);
  const title = getTitle(req.query);
  const route = req.query.mode ? 'recettes/edit' : 'recettes/detail';
  res.render(route, { mode: req.query.mode, title, recette });
}

async function edit(req, res) {
  const { auteur, data } = getAuteurAndData(req);
  const recette = await RecetteService.update({ data, auteur });
  res.redirect('/recette/' + recette._id);
}

async function post(req, res) {
  const { auteur, data } = getAuteurAndData(req);
  const recette = await RecetteService.post({ data, auteur });
  res.redirect('/recette/' + recette._id);
}

function getAuteurAndData(req) {
  return { auteur: req.user.local.pseudo, data: req.body };
}

function getTitle({ mode }) {
  switch (mode) {
    case 'edit':
      return 'Modifiez la recette';
    case 'fork':
      return 'Sauvegardez une copie de la recette';
    default:
      return 'Détail de la recette';
  }
}
