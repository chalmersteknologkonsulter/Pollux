exports.model = `

'use strict';

class {{name}} {
  constructor(db) {
    this.db = db;
  }

  find () {
    return Promise.resolve([]);
  }
}

module.exports = {{name}};
`;

exports.controller = `

'use strict';
const db = require('../../db');

exports.list = function (req,res,next) {
  res.status(200).json({message:'Here\\'s your resource..'});
};

`;

exports.route = `

'use strict';
const routes = require('express').Router();
const {{resource}} = require('./{{resource}}.controller');

routes.get('/', {{resource}}.list);

module.exports = routes;
`;

exports.routeTest = `

'use strict';
const {
  expect, assert
} = require('chai');
const {app} = require('../../server.js');
const db = require('../../db');
const request = require('supertest');

describe('{{name}} HTTP API',() => {
  
  it('GET: all {{name}}s',(done) => {
    request(app)
      .get('/api/{{resource}}s')
      .expect('Content-Type',/json/)
      .expect(200)
      .end((err,response) => {
        if(err)
          return done(err);
        expect(response.body).to.be.an('object');
        done();
      });
  });
  
});

`;

exports.modelTest = ` 
'use strict';
const {
  expect, assert
} = require('chai');
const app = require('../../server.js');
const db = require('../../db');

describe('{{name}} Database',() => {

it('should be able to get all {{name}}s',(done) => {
  db.{{name}}.find()
  .then(({{resource}}) => {
    expect({{resource}}).to.be.an('array');
    done();
  })
  .catch(done);
});

});
`;
