'use strict';
const db = require('../db');
const path = require('path');

function sql (file) {
  var fullPath = path.join(__dirname, file);
  return new db.$config.pgp.QueryFile(fullPath, { minify: true });
}

const clearAndInitialize = sql('../db/sql/init/init.sql');

// Clear the database
// Returns a promise
function refreshDB () {
  return db.any(clearAndInitialize);
}

module.exports = (process.env.NODE_ENV === 'test') ? {
  refreshDB: refreshDB
} : {};
