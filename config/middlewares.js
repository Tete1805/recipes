const express = require('express');
const router = express.Router();
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const minify = require('express-minify');
const session = require('express-session');
const passport = require('passport');
const configPassport = require('./passport');
const flash = require('connect-flash');
const csurf = require('csurf');
const MongoStore = require('connect-mongo');
const mongoose = require('./database.js');

router.use(logger('common'));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());
router.use(compression());
router.use(minify());
router.use(
  session({
    secret: 'PlopzeSecret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: mongoose.url }),
  })
);
mongoose.configureDatabase();
configPassport(passport);
router.use(passport.initialize());
router.use(passport.session());
router.use(flash());
router.use(csurf());
router.use(function (req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  res.locals.flash = req.flash();
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
});

module.exports = router;
