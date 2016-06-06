var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get(['/login', '/profile'], function(req, res, next) {
  if (req.query.username) {
    req.session.user = { username: req.query.username }
  }
  next();
});

router.get('/logout', function(req, res, next) {
  delete req.session.user;
  next();
})

module.exports = router;