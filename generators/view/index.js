'use strict';

var yeoman = require('yeoman-generator');
var _ = require('lodash');
var path = require('path');

var format = require('util').format;

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.props = {};

    this.throwError = function (message) {
      this.log.error(message);
      process.exit(1);
    };

    this.props.root = path.join(this.destinationRoot(), './app/src');

    var raw = this.args[0];

    if (raw.indexOf('.') === -1)
      this.throwError('First argument should be module name and filter name separated by a dot.');

    this.props.feature = raw.split('.')[0];
    this.props.name = _.deburr(raw.split('.')[1]);

    if (_.isEmpty(this.props.feature) || _.isEmpty(this.props.name))
      this.throwError('Feature and/or filter name can\'t be empty.');

    this.props.view = _.camelCase(this.props.name);

  },
  writing: function () {
    this.fs.copy(
      this.templatePath('view.html'),
      this.destinationPath(format('%s/%s/%s.html', this.props.root, this.props.feature, this.props.view))
    );
  }
});
