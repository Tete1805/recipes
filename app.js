var express       = require('express');
var app           = express();

var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var fs            = require('fs');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var session       = require('express-session');
var minify        = require('express-minify');
var compression   = require('compression')

var mongoose      = require('mongoose');
var passport      = require('passport');
var flash         = require('connect-flash');
var csurf         = require('csurf');

var index         = require('./routes/index');
var users         = require('./routes/users');
var user          = require('./routes/user');
var recettes      = require('./routes/recettes');
var recette       = require('./routes/recette');
var aromes        = require('./routes/aromes');
var admin         = require('./routes/admin');

// Où est stockée la chaîne de connexion
var configDb      = require('./config/database.js');

// Permet de spécifier un autre moteur de promesses que mPromise
 mongoose.Promise = global.Promise;

// Connexion à la base de données
mongoose.connect(configDb.url, function(err) {
  if (err) {
    console.log('Sushi connecting to db: ' + err);
  } else {
    console.log('Connection success');
  }
});

// Configuration de passport avec les stratégies
require('./config/passport')(passport);

// Endroit où sont stockées les vues
app.set('views', path.join(__dirname, 'views'));
// Configuration du moteur de vue à Jade
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('common'));
// log all requests to access.log
app.use(logger('common', {
  stream: fs.createWriteStream(path.join(__dirname, 'http.log'), {flags: 'a'})
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(minify());
app.use(express.static(path.join(__dirname, 'public')));

// Pour la session
app.use(session( { secret: 'PlopzeSecret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
// app.use(csurf());

app.use(function(req, res, next) {  
  //res.locals.csrfToken = req.csrfToken();
  res.locals.flash  = req.flash();
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  };
  next();
});

app.use(require('./config/helpers'));

app.use('/', index);
app.use('/recettes', recettes);
app.use('/recette', recette);
app.use('/aromes', aromes);
app.use('/users', users);
app.use('/user', user);
app.use('/admin', admin);
//app.use('/api', require('./api/index'));
app.use('/*(.php|cgi|cfm|w00t|webdav)*/', function(req, res, next) {
  res.status(418).end()
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Je ne sais pas où vous avez essayé d'aller, mais je n'ai rien trouvé ici...");
  err.status = 404;
  next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.locals.env = app.get("env");
  res.status(err.status || 500);
  res.render('site/error', {
    message: err.message,
    error: err
  });
});

module.exports = app;
