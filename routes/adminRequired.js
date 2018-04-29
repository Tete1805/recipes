function adminRequired(req, res, next) {
  if (req.isAuthenticated() && req.user.local.pseudo === "Tete1805") {
    next()
  } else {
    var err = new Error("Vous n'êtes pas autorisé. :)");
    err.status = 403;
    next(err);
  }
}

module.exports = adminRequired;