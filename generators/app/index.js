'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');

var utils = require('../../utils');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    this.log(yosay(
      'Welcome to the super ' + chalk.red('generator-ng-bat') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Name of your app?',
      default: this.appname,
      filter: function (val) {
        return _.kebabCase(val);
      }
    }, {
      type: 'input',
      name: 'username',
      message: 'Your github username?',
      default: null
    }, {
      type: 'list',
      name: 'license',
      message: 'Select a license?',
      choices: [
        'MIT',
        'ISC',
        'Apache-2.0',
        'BSD'
      ],
      default: 'MIT'
    }, {
      type: 'input',
      name: 'repository',
      message: 'URL to remote repository?',
      default: function (answers) {
        return answers.username ? 'https://github.com/' + answers.username + '/' + answers.name : null
      }
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
      if (path.match(/png|jpe?g|gif/)) {
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
    this.npmInstall();
  }
});
