'use strict';

module.exports = controller;

/* @ngInject */
function controller($log) {
  var vm = this;

  vm.welcomeMessage = 'Yet another generator for angular powered by webpack.';
  vm.testFunction = testFunction;

  if (__DEV__) { // eslint-disable-line no-undef
    $log.info('Initializing controller');
  }

  function testFunction(num) {
    $log.info('This is a test function number ' + num);
  }
}
