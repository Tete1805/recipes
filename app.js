const express = require('express');
const app = express();

const configureDatabase = require('./config/database.js');
configureDatabase();

const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

const middlewares = require('./config/middlewares');
const helpers = require('./config/helpers');
const routes = require('./routes/');
const errorHandling = require('./config/errorHandling');
app.use(middlewares);
app.use(helpers);
app.use(routes);
app.use(errorHandling);

module.exports = app;
