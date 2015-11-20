'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-ng-bat:app', function () {
  var prompts = {
    name: 'tumblr',
    repository: 'https://github.com/batman/tumblr',
    license: 'MIT'
  };
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({/*No options functionality so far*/})
      .withPrompts(prompts)
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      '.editorconfig',
      '.eslintrc',
      '.gitignore',
      'package.json',
      'README.md',
      'robots.txt',
      'webpack.config.js',
      'app/index.html',
      'app/images/angular.png',
      'app/images/webpack.png',
      'app/src/app.module.js',
      'app/src/common/common.module.js',
      'app/src/common/common.scss',
      'app/src/core/core.module.js',
      'app/src/core/core.scss',
      'app/src/core/restangular.config.js',
      'app/src/core/router.config.js',
      'app/src/core/router.run.js',
      'app/src/welcome/welcome.controller.js',
      'app/src/welcome/welcome.html',
      'app/src/welcome/welcome.module.js',
      'app/src/welcome/welcome.scss'
    ]);
  });

  it('populates package.json', function () {
    assert.JSONFileContent('package.json', prompts);
  });

});
