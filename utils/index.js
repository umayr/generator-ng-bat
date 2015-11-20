/**
 * Created by Umayr Shahid on 11/17/15.
 */

'use strict';
var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var format = require('util').format;
var write = require('html-wiring').writeFileFromString;

var utils = module.exports = {};

/**
 * Recursively gets files from a directory.
 *
 * @param dir
 * @param files
 * @returns {*|Array}
 */
utils.getFiles = function getFiles(dir, files) {
  files = files || [];
  var tmp = fs.readdirSync(dir);
  for (var i in tmp) {
    var name = dir + '/' + tmp[i];
    if (fs.statSync(name).isDirectory()) getFiles(name, files);
    else files.push(name);
  }
  return files;
};

/**
 * Method to inject the newly created feature into the main app.module.js
 */
utils.injectFeature = function injectFeature() {
  var modulePath = path.join(this.props.root, './app.module.js');

  if (!this.fs.exists(modulePath))
    throw new Error('Can\'t find app.module.js');

  var file = this.fs.read(modulePath);

  var lines = file.split('\n');
  var cursor = _.findLastIndex(lines, function (value) {
    return _.contains(value, ']);');
  });


  var top = _.slice(lines, 0, cursor);
  var bottom = _.slice(lines, cursor);

  top[cursor - 1] += ',';
  top.push(format('  require(\'./%s/%s.module.js\')', this.props.feature, this.props.feature));

  lines = top.concat(bottom);
  file = lines.join('\n');

  write(file, modulePath);
};

/**
 * Method to inject the newly created component into the module file.
 *
 * @param target
 */
utils.injectComponent = function injectComponent(target) {
  var modulePath = path.join(this.props.root, format('./%s/%s.module.js', this.props.feature, this.props.feature));

  if (!this.fs.exists(modulePath))
    throw new Error('Can\'t find module file for provided feature');

  var file = this.fs.read(modulePath);

  var lines = file.split('\n');
  var cursor = _.findIndex(lines, function (value) {
    return value === 'angular';
  });

  var top = _.slice(lines, 0, cursor);
  var focus = _.slice(lines, cursor);

  cursor = _.findIndex(focus, function (value) {
    return value === ';';
  });

  var bottom = _.slice(focus, cursor);
  focus = _.slice(focus, 0, cursor);

  focus.push(target);

  lines = top.concat(focus).concat(bottom);
  file = lines.join('\n');

  write(file, modulePath);
};


