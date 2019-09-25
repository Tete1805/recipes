const express = require('express');
const router = express.Router();
const listService = require('../services/list');
const User = require('../models/user');
const adminRequired = require('./adminRequired');

router.get('/recettes', adminRequired, async (req, res) => {
  const recettes = await new listService('recettes').setLimit(0).get();
  res.render('admin/recettes', {
    title: 'Admin recettes',
    recettes
  });
});

router.get('/users', adminRequired, function(req, res) {
  User.find()
    .sort('level')
    .sort('ajoute')
    .exec((err, results) => {
      res.render('admin/users', { title: 'Admin users', users: results });
    });
});

router.get('/aromes', adminRequired, async (req, res) => {
  const aromes = await new listService('aromes').setLimit(0).get();
  res.render('admin/aromes', { title: 'Admin aromes', aromes });
});

module.exports = router;
