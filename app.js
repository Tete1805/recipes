const express = require('express');
const app = express();

const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const minify = require('express-minify');
const compression = require('compression');

const passport = require('passport');
const flash = require('connect-flash');
const csurf = require('csurf');

const helpers = require('./config/helpers');

const accueil = require('./routes/accueil');
const authentication = require('./routes/authentication');
const profile = require('./routes/profile');
const recettes = require('./routes/recettes');
const recette = require('./routes/recette');
const aromes = require('./routes/aromes');
const admin = require('./routes/admin');
const list = require('./routes/list');

// Où est stockée la chaîne de connexion
const configureDatabase = require('./config/database.js');
configureDatabase();

// Configuration de passport avec les stratégies
require('./config/passport')(passport);

// Endroit où sont stockées les vues
app.set('views', path.join(__dirname, 'views'));
// Configuration du moteur de vue à Jade
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(minify());
app.use(express.static(path.join(__dirname, 'public')));

// Pour la session
app.use(
  session({ secret: 'PlopzeSecret', resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(csurf());

app.use(function(req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  res.locals.flash = req.flash();
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
});

app.use(helpers);

app.use('/', accueil);
app.use('/recettes', recettes);
app.use('/recette', recette);
app.use('/aromes', aromes);
app.use('/authentication', authentication);
app.use('/profile', profile);
app.use('/admin', admin);
app.use('/list', list);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error(
    "Je ne sais pas où vous avez essayé d'aller, mais je n'ai rien trouvé ici..."
  );
  err.status = 404;
  next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.locals.env = app.get('env');
  res.status(err.status || 500);
  res.render('site/error', {
    message: err.message,
    error: err
  });
});

module.exports = app;
