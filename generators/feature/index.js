'use strict';

var yeoman = require('yeoman-generator');
var _ = require('lodash');
var fs = require('fs');
var path = require('path');

var format = require('util').format;
var write = require('html-wiring').writeFileFromString;

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.props = {};
    try {
      this.props.package = require(path.join(this.destinationRoot(), './package.json'));
    }
    catch (e) {
      this.log.error(e.message);
    }
    this.props.root = path.join(this.destinationRoot(), './app/src');
    this.props.name = this.props.package.name;
    this.props.feature = this.args[0];
    this.props.controller = _.capitalize(_.deburr(this.props.feature));
  },
  writing: function () {
    this.fs.copy(
      this.templatePath('controller.js'),
      this.destinationPath(format('%s/%s/%s.controller.js', this.props.root, this.props.feature, this.props.feature))
    );

    this.fs.copyTpl(
      this.templatePath('module.js'),
      this.destinationPath(format('%s/%s/%s.module.js', this.props.root, this.props.feature, this.props.feature)),
      {
        feature: this.props.feature,
        controller: this.props.controller,
        name: this.props.name
      }
    );

    this.fs.copyTpl(
      this.templatePath('view.html'),
      this.destinationPath(format('%s/%s/%s.html', this.props.root, this.props.feature, this.props.feature)),
      {
        feature: this.props.feature
      }
    );

    this.fs.copyTpl(
      this.templatePath('styles.scss'),
      this.destinationPath(format('%s/%s/%s.scss', this.props.root, this.props.feature, this.props.feature)),
      {
        feature: this.props.feature
      }
    );

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
  }
});
