/**
 * Module dependencies.
 */

var express = require('express');
var session = require('express-session');
var compression = require('compression');
var morgan = require('morgan');
var redis = require('redis');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var csrf = require('csurf');

var flash = require('connect-flash');
var winston = require('winston');
var config = require('./');
var pkg = require('../package.json');

var env = process.env.NODE_ENV || 'development';

/**
 * Expose
 */

module.exports = function (app, passport) {

  // Compression middleware (should be placed before express.static)
  app.use(compression({
    threshold: 512
  }));

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  // Static files middleware
  app.use(express.static(config.root + '/public'));

  // Use winston on production
  var log;
  if (env !== 'development') {
    log = {
      stream: {
        write: function (message, encoding) {
          winston.info(message);
        }
      }
    };
  } else {
    log = 'dev';
  }

  // Don't log during tests
  // Logging middleware
  if (env !== 'test') app.use(morgan(log));

  // bodyParser should be above methodOverride
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  }));

  // cookieParser should be above session
  app.use(cookieParser());
  //app.use(cookieSession({ secret: 'secret' }));
  
  var sessionOptions = {
    secret: pkg.name,
    proxy: true,
    resave: true,
    saveUninitialized: true,
    // 30 days
    cookie: {
      maxAge:2592000000
    }
  }

  app.use(session(sessionOptions));

  // use passport session
  app.use(passport.initialize());
  app.use(passport.session());
  /*
  // connect flash for flash messages - should be declared after sessions
  app.use(flash());
  
  // adds CSRF support
  if (process.env.NODE_ENV !== 'test') {
    app.use(csrf());
   // This could be moved to view-helpers :-)
   app.use(function (req, res, next){
   res.locals.csrf_token = req.csrfToken();
   next();
   });
   }
   */
};
