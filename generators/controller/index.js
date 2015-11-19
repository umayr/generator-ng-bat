'use strict';

var yeoman = require('yeoman-generator');
var _ = require('lodash');
var path = require('path');

var format = require('util').format;
var write = require('html-wiring').writeFileFromString;


module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.props = {};
    this.throwError = function (message) {
      this.log.error(message);
      process.exit(1);
    };

    try {
      this.props.package = require(path.join(this.destinationRoot(), './package.json'));
    }
    catch (e) {
      this.throwError(e.message);
    }

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

    focus.push(format('  .controller(\'%s\', require(\'./%s.controller.js\'))', this.props.controller, this.props.name));

    lines = top.concat(focus).concat(bottom);
    file = lines.join('\n');

    write(file, modulePath);
  }
});
