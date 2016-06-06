var express = require('express');
var router = express.Router();

router.get(['/', '/all'], function(req, res, next) {
  res.render('aromes/all', { title: 'Tous les arômes '});
});

router.get('/new', function(req, res, next) {
  res.render('aromes/new', { title: 'Nouvel arôme '});
});

router.get('/my', function(req, res, next) {
  res.render('aromes/my', { title: 'Tous mes arômes '});
});

module.exports = router;
