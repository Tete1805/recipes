const express = require('express');
const router = express.Router();
const aromeService = require('../services/arome');
const { ListService } = require('../services/list');
const authRequired = require('./authRequired');

router.get(['/', '/all'], async (req, res) => {
  const aromes = await new ListService('aromes').get();
  res.render('aromes/all', {
    title: 'Tous les arômes',
    aromes
  });
});

router.get('/all/:page', async function(req, res) {
  const page = req.query.page || 0;
  const aromes = await new ListService('aromes').setPage(page).get();
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
