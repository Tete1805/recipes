var express = require('express');
var router = express.Router();

// catch 404 and forward to error handler
router.use(function Erreur404(req, res, next) {
  var err = new Error("Il n'y a rien ici.");
  err.status = 404;
  next(err);
});

// production error handler
// no stacktraces leaked to user
router.use(function Erreur500(err, req, res, next) {
  res.status(err.status || 500);
  res.render('site/error', {
    message: err.message,
    error: err
  });
});

module.exports = router;
