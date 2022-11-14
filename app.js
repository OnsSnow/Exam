var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require ('http'); 
var indexRouter = require('./routes/index');
var ProduitRoute = require('./routes/produit');
const mongoose = require('mongoose');
const db = require('./database.json');
const Produit = require('./model/Produit');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/produit', ProduitRoute);

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
  res.render('error');
});
const server = http.createServer(app);
console.log(db)
mongoose.connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true },()=> {
  console.log('connected to database');
});
server.listen(3000, () => {
  console.log('Server running')
})
