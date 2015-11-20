'use strict';

var yeoman = require('yeoman-generator');
var _ = require('lodash');
var path = require('path');

var format = require('util').format;

var utils = require('../../utils');

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

    this.props.filter = _.camelCase(this.props.name);

  },
  writing: function () {

    this.fs.copy(
      this.templatePath('filter.js'),
      this.destinationPath(format('%s/%s/%s.filter.js', this.props.root, this.props.feature, this.props.filter))
    );

    utils.injectComponent.call(this,
      format(
        '  .filter(\'%s\', require(\'./%s.filter.js\'))',
        this.props.filter,
        this.props.filter
      )
    );
  }
});
