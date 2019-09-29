const express = require('express'),
  router = express.Router(),
  { ListService } = require('../services/list'),
  searchService = require('../services/search');

router.get(['/', '/all/:page'], async (req, res) => {
  const page = parseInt(req.params.page, 10) || 1;
  const recettes = await new ListService('recettes').setPage(page).get();
  res.render('recettes/all', { recettes, page });
});

router.get(
  [
    '/search/:searchField/:searchString/',
    '/search/:searchField/:searchString/:page'
  ],
  async (req, res) => {
    const filter = searchService.getFilterFromParams(req.params);
    const page = parseInt(req.params.page, 10) || 1;
    const recettes = await new ListService('recettes')
      .setFilter(filter)
      .setPage(page)
      .get();
    res.render('recettes/all', { recettes, page });
  }
);

module.exports = router;
