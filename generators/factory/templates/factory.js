'use strict';

module.exports = factory;

/* @ngInject */
function factory($log) {
  return {
    testFunction: testFunction
  };

  function testFunction() {
    $log.info('This is a test function.');
  }
}
