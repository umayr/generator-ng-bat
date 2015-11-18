'use strict';

module.exports = configuration;

/* @ngInject */
function configuration($urlRouterProvider) {
  $urlRouterProvider.otherwise('/welcome');
}
