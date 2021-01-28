'use strict'

/**
 * Small runnable that takes a resource name as argument
 * and generates controller, model, test-files etc
 */

const handlebars = require('handlebars'),
  fs = require('fs'),
  path = require('path');

require('../prototype_extensions.js');

const TEMPLATE_FILE = path.join(__dirname, 'templates.js');

var args = process.argv;
var resource = args[2] || 'home';
var data = {
  name: resource.toString().capitalize(),
  resource: resource
};
const {
  model, controller, route,
  modelTest, routeTest
} = require('./templates.js');

function output (source, data) {
  var template = handlebars.compile(source);
  return template(data);
}

function toPath (file) {
  return path.join(__dirname, '../app/' + resource + '/' + file);
}

fs.mkdir(path.join(__dirname, '../app/' + data.resource), (error) => {
  if (error) throw error;
  console.log('Created ' + resource + ' directory');
  fs.writeFileSync(
    toPath('' + resource + '.controller.js'),
    output(controller, data)
  );
  console.log('Created ' + toPath('' + resource + '.controller.js'));
  fs.writeFileSync(
    toPath('' + resource + '.model.js'),
    output(model, data)
  );
  console.log('Created ' + toPath('' + resource + '.model.js'));
  fs.writeFileSync(
    toPath('' + resource + '.route.js'),
    output(route, data)
  );
  console.log('Created ' + toPath('' + resource + '.route.js'));
  fs.writeFileSync(
    toPath('' + resource + '.model.test.js'),
    output(modelTest, data)
  );
  console.log('Created ' + toPath('' + resource + '.model.test.js'));
  fs.writeFileSync(
    toPath('' + resource + '.route.test.js'),
    output(routeTest, data)
  );
  console.log('Created ' + toPath('' + resource + '.route.test.js'));
  console.log('Don\'t forget to add route to api.routes.js!!!');
});

