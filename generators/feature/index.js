'use strict';

var yeoman = require('yeoman-generator');
var _ = require('lodash');

var format = require('util').format;

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.props.feature = this.name;
    this.props.controller = _.capitalize(_.deburr(this.name));
  },
  writing: function () {
    var path = 'app/src';

    this.fs.copy(
      this.templatePath('controller.js'),
      this.destinationPath(format('%s/%s/%s.controller.js', path, this.props.feature, this.props.feature))
    );

    this.fs.copyTpl(
      this.templatePath('module.js'),
      this.destinationPath(format('%s/%s/%s.module.js', path, this.props.feature, this.props.feature)),
      {
        feature: this.props.feature,
        controller: this.props.controller
      }
    );

    this.fs.copyTpl(
      this.templatePath('view.html'),
      this.destinationPath(format('%s/%s/%s.html', path, this.props.feature, this.props.feature)),
      {
        feature: this.props.feature
      }
    );

    this.fs.copyTpl(
      this.templatePath('styles.scss'),
      this.destinationPath(format('%s/%s/%s.scss', path, this.props.feature, this.props.feature)),
      {
        feature: this.props.feature
      }
    );
  }
});
