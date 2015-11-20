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
      this.throwError('First argument should be module name and controller name separated by a dot.');

    this.props.feature = raw.split('.')[0];
    this.props.name = _.deburr(raw.split('.')[1]);

    if (_.isEmpty(this.props.feature) || _.isEmpty(this.props.name))
      this.throwError('Feature and/or controller name can\'t be empty.');

    this.props.controller = _.capitalize(this.props.name);

  },
  writing: function () {

    this.fs.copy(
      this.templatePath('controller.js'),
      this.destinationPath(format('%s/%s/%s.controller.js', this.props.root, this.props.feature, this.props.name))
    );

    if (this.options.withView)
      this.fs.copyTpl(
        this.templatePath('view.html'),
        this.destinationPath(format('%s/%s/%s.html', this.props.root, this.props.feature, this.props.name)),
        {
          name: this.props.name
        }
      );

    utils.injectComponent.call(this,
      format(
        '  .controller(\'%s\', require(\'./%s.controller.js\'))',
        this.props.controller,
        this.props.name
      )
    );
  }
});
