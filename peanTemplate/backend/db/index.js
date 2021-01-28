const fs = require('fs');
const path = require('path');
const env = process.env.NODE_ENV;
// Initate models
var models = {};
loadModels();
// Initiate pg-promise and append all models to db object
const pgp = require('pg-promise')({
  connect: () => {
    if (env !== 'test')
      console.log('Connected to database');
  },
  disconnect: () => {
    if (env !== 'test')
      console.log('Disconnecting from database');
  },
  noWarnings: true,
  extend: (obj, dc) => {
    for (var m in models) {
      obj[m] = new models[m](obj);
    }
  }
});
const config = require('../config');
const db = pgp(config.db);

function getDirectories (srcpath) {
  return fs.readdirSync(srcpath)
    .filter(file => fs.lstatSync(path.join(srcpath, file)).isDirectory());
}

function loadModels () {
  getDirectories('app').forEach(dir => {
    fs.readdirSync(path.join('app', dir))
      .filter(file => {
        return file.indexOf('model.js') > -1 &&
          // This is for vim..
          file.indexOf('swp') < 0;
      })
      .forEach(file => {
        var name = file.split('.')[0].capitalize();
        models[name] = require(path.join('../app', dir, file));
      });

  });
}


module.exports = db;
