const express = require('express');
const router = express.Router();
const filterService = require('../services/search');
const listService = require('../services/list');

router.use('/recettes/', async (req, res) => {
  const { search, fields } = req.query;
  const filter = filterService.getFilterForRecettes({ search, fields });
  const recettes = await new listService('recettes').setFilter(filter).get();
  res.render('recettes/all', { recettes });
});

module.exports = router;
