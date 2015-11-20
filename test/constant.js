'use strict';
var path = require('path');
var fs = require('fs-extra');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-ng-bat:constant', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/constant'))
      .withArguments(['common.constant'])
      .inTmpDir(function (dir) {
        fs.copySync(path.join(__dirname, '../generators/app/templates'), dir);
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'app/src/feature/constant.constant.js'
    ]);
  });
});
