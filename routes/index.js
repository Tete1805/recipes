var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('site/index', { title: 'Recipes' });
});

module.exports = router;
