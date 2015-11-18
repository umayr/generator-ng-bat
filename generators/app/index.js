'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var utils = require('../../utils');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    this.log(yosay(
      'Welcome to the super ' + chalk.red('generator-ngpack') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'What would you like to name your app?',
      default: this.appname
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing: function () {
    var files = utils.getFiles(__dirname + '/templates');
    files.forEach(function (file) {
      var path = file.split('templates/')[1];
      if (path.match(/png/)) {
        this.fs.copy(
          this.templatePath(path),
          this.destinationPath(path)
        );
      }
      else {
        this.fs.copyTpl(
          this.templatePath(path),
          this.destinationPath(path),
          {
            name: this.props.name || null,
            license: this.props.license || null,
            repository: this.props.repository || null
          }
        );
      }
    }.bind(this));
  },

  install: function () {
    //this.installDependencies();
  }
});
