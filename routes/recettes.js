var express = require('express'),
  router = express.Router(),
  listService = require('../services/list'),
  searchService = require('../services/search');

router.get(['/', '/all/:page'], async (req, res) => {
  const page = parseInt(req.params.page, 10);
  const recettes = await new listService('recettes').setPage(page).get();
  res.render('recettes/all', { recettes, page });
});

router.get(
  [
    '/search/:searchField/:searchString/',
    '/search/:searchField/:searchString/:page'
  ],
  async (req, res) => {
    const filter = searchService.getFilterFromParams(req.params);
    const page = parseInt(req.params.page, 10);
    const recettes = await new listService('recettes')
      .setFilter(filter)
      .setPage(page)
      .get();
    res.render('recettes/all', { recettes, page });
  }
);

module.exports = router;
