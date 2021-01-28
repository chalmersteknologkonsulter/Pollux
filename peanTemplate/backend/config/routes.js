'use strict';

const routes = require('../app/api.routes');

/**
 * Expose
 */

module.exports = function (app, passport) {


  app.get('/api/user',(req,res) => {
    const user = req.user ? {user:req.user} : null
    res.status(200).json(user)
  })

  /**
   * Kill session and logout
   */
  app.get('/api/logout',(req,res,next) => {
    req.session.destroy()
    req.logout()
    res.status(200).json({message:'Log out!'});
  })

  // Add all app routes
  app.use('/api', routes)

  /**
   * Error handling
   */

  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }
    console.error(err.stack);
    // error page
    res.status(500).json({ error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function (req, res, next) {
    res.status(404).json({
      url: req.originalUrl,
      error: 'Not found'
    });
  });
};
