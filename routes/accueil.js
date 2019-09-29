const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('site/accueil', { title: 'Recipes' });
});

module.exports = router;
