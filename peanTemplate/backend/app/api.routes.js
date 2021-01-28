const routes = require('express').Router();

routes.get('/', function (req, res) {
  res.status(418).json({ message: 'Im\' a teapot' });
});


module.exports = routes;
