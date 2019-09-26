function authRequired(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/authentication/login');
  }
}

module.exports = authRequired;
