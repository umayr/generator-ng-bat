'use strict';

var yeoman = require('yeoman-generator');
var _ = require('lodash');
var path = require('path');

var format = require('util').format;

var utils = require('../../utils');

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

    utils.injectFeature.call(this);
  }
});
