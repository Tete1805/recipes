const express = require('express');
const router = express.Router();
const aromeService = require('../services/arome');
const authRequired = require('./authRequired');
const NUMBER_OF_ITEMS_TO_FETCH = 50;

router.get(['/', '/all'], async (req, res) => {
  const aromes = await aromeService.fetch(NUMBER_OF_ITEMS_TO_FETCH);
  res.render('aromes/all', {
    title: 'Tous les arômes',
    aromes: aromes
  });
});

router.get('/all/:page', async function(req, res) {
  const skip = req.query.page || 0;
  const aromes = await aromeService.fetch(NUMBER_OF_ITEMS_TO_FETCH, skip);
  res.render('aromes/all', {
    title: 'Tous les arômes',
    aromes: aromes
  });
});

router.get('/new', authRequired, function(req, res) {
  res.render('aromes/new', { title: 'Nouvel arôme ' });
});

router.post('/new', authRequired, function(req, res) {
  aromeService.create(req.body);
  res.redirect('/aromes/all');
});

router.get('/my', authRequired, function(req, res) {
  res.render('aromes/my', { title: 'Tous mes arômes ' });
});

module.exports = router;
