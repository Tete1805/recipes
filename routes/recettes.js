var express = require('express'),
  router = express.Router(),
  Recette = require('../models/recette'),
  listService = require('../services/list'),
  searchService = require('../services/search');

router.get(['/', '/all/:page'], async (req, res) => {
  const recettes = listService.list('recettes');
  const page = parseInt(req.params.page, 10);
  const results = await recettes.getPage(page);
  res.render('recettes/all', { recettes: results, page });
});

router.get(
  [
    '/search/:searchField/:searchString/',
    '/search/:searchField/:searchString/:page'
  ],
  (req, res) => {
    const filter = searchService.getFilterFromParams(req.params);
    Recette.find(filter)
      .skip(10 * (parseInt(req.params.page, 10) - 1 || 0))
      .limit(10)
      .exec((err, results) => {
        res.render('recettes/all', {
          recettes: results,
          page: req.params.page
        });
      });
  }
);

module.exports = router;
