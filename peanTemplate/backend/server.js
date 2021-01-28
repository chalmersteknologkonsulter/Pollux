'use strict';

/*
 * nodejs-express-mongoose
 * Copyright(c) 2015 Madhusudhan Srinivasa <madhums8@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies
 */

require('dotenv').config();
require('./prototype_extensions.js');
const fs = require('fs');
const join = require('path').join;
const express = require('express');
const passport = require('passport');
const config = require('./config');

const port = process.env.PORT || 3000;

const app = express();
listen()

// Bootstrap routes
require('./config/passport')(passport);
require('./config/express')(app, passport);
require('./config/routes')(app, passport);

function listen () {
  if (app.get('env') === 'test') return;
  app.listen(port);
  console.log('Express app started on port ' + port);
}

/**
 * Expose
 */

module.exports = {
  app
};
