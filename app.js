"use strict";

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

require('./lib/connectDB');
require('./models/anuncio');
require('./models/usuario');
require('./models/tag');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Rutas de nuestra aplicación
app.use('/',                require('./routes/index'));
app.use('/apiv1/anuncios',  require('./routes/apiv1/anuncios'));
app.use('/apiv1/usuarios',  require('./routes/apiv1/usuarios'));
app.use('/apiv1/tags',      require('./routes/apiv1/tags'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  // if is API, send json with error
  if (isAPI(req)) {
    res.json({success: false, error: err.message});
    return;
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.render('error');
});

function isAPI(req) {
  return req.originalUrl.indexOf('/apiv') === 0;
}

module.exports = app;
