var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('site/index', { title: 'Recipes' });
});

module.exports = router;
