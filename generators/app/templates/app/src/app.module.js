'use strict';

require('angular');

angular.module('<%= name %>', [
  require('./core/core.module.js'),
  require('./common/common.module.js'),
  require('./welcome/welcome.module.js')
]);
