'use strict';

require('./core.scss');

var name = module.exports = '<%= name %>.core';

// Fix to make restangular work with webpack since it doesn't support common js.
// For more info: https://github.com/mgonto/restangular/issues/749
require('restangular');

angular
  .module(name, [
    require('angular-ui-router'),
    'restangular'
  ])
  .config(require('./restangular.config.js'))
  .config(require('./router.config.js'))
  .run(require('./router.run.js'))
;






