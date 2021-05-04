var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwtLoginController = require('./controllers/jwtLoginController');
var indexRouter = require('./routes/index');

var app = express();

require('./lib/connectMongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('/images/anuncios'))

//Router api

app.use('/apiv1/anuncios', require('./routes/api/anuncios'));
app.post('/apiv1/authenticate',   jwtLoginController.postJWT);
//app.use('/apiv1/tags',require('./routes/api/tags'))
//app.use('/apiv1/anuncios/tags', require('./routes/api/anuncios'))

// Setup de i18n
const i18n = require('./lib/i18nConfigure');
exports = i18n;
app.use(i18n.init);


//Router web

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  if (isAPIRequest(req)) {
    return res.json({ error: err.message });
  }

  res.render('error');
});

function isAPIRequest(req) {
  return req.originalUrl.indexOf('/api/') === 0;
}


module.exports = app;
