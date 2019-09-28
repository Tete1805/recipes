const express = require('express');
const router = express.Router();
const { ListService } = require('../services/list');
const adminRequired = require('./adminRequired');

router.get('/recettes', adminRequired, async (req, res) => {
  const recettes = await new ListService('recettes').setLimit(0).get();
  res.render('admin/recettes', {
    title: 'Admin recettes',
    recettes
  });
});

router.get('/users', adminRequired, async (req, res) => {
  const users = await new ListService('users')
    .setSorts(['level', 'ajoute'])
    .setLimit(0)
    .get();
  res.render('admin/users', { title: 'Admin users', users });
});

router.get('/aromes', adminRequired, async (req, res) => {
  const aromes = await new ListService('aromes').setLimit(0).get();
  res.render('admin/aromes', { title: 'Admin aromes', aromes });
});

module.exports = router;
