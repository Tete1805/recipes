var express = require('express');
var router = express.Router();

router.get(['/', '/all'], function(req, res, next) {
  console.log('models/recettes/all');
  next();
});

router.get('/new', function(req, res, next) {
  req.recipe = {
    name: 'New Recipe', 
    date: new Date().toISOString().substr(0,10), 
    flavors: [{name: 'Arôme 1', percentage: '0.5'}], bases: [{ ratio: '70/30' }]
  };
  next();
});

module.exports = router;