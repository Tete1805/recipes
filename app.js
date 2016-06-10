var express       = require('express');
var app           = express();

var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var session       = require('express-session');

var mongoose      = require('mongoose');
var passport      = require('passport');
var flash         = require('connect-flash');
var csurf         = require('csurf');

var routes        = require('./routes/index');
var users         = require('./routes/users');
var recettes      = require('./routes/recettes');
var groupes       = require('./routes/groupes');
var aromes        = require('./routes/aromes');

// Où est stockée la chaîne de connexion
var configDb      = require('./config/database.js');

// Connexion à la base de données
mongoose.connect(configDb.url);

// Configuration de passport avec les stratégies
require('./config/passport')(passport);

// Endroit où sont stockées les vues
app.set('views', path.join(__dirname, 'views'));
// Configuration du moteur de vue à Jade
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Pour la session
app.use(session( { secret: 'PlopzeSecret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(csurf());

app.use(function(req, res, next) {  
  res.locals.csrfToken = req.csrfToken();
  res.locals.flash     = req.flash();
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  };
  next();
});

app.use('/', routes);
app.use('/recettes', recettes);
app.use('/groupes', groupes);
app.use('/aromes', aromes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
