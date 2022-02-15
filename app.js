const createError = require('http-errors');
const express = require('express');
const passport = require('passport');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv').config();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// MongoDB begin
const mongo_config = require('./database/config/db');
const mongoose = require('mongoose');
mongoose.connect(mongo_config.url, { useNewUrlParser: true }).then(
  () => {
    console.log('Connection to MongoDB established');
  },
  (error) => {
    console.log('Error when try to connect MongoDB:', error);
  }
);
mongoose.connection.on('error', error => console.log(error) );
global.DB = mongoose;
// MongoDB end

require('./middleware/auth');

// Routes begin
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/entities', passport.authenticate('jwt', { session: false }),require('./routes/entity'));
// Routes end


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


module.exports = app;
