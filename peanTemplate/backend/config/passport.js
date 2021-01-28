'use strict';

/*
 * Module dependencies.
 */

//const google = require('./passport/google');


/**
 * Expose
 */

module.exports = function (passport) {

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });
  
  //passport.use(google);
};
