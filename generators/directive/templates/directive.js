'use strict';

module.exports = directive;

/* @ngInject */
function directive($log) {

  return {
    link: link,
    restrict: 'E',
    template: '<div></div>',
    scope: {
      test: '='
    }
  };

  function link(/*scope, elem, attrs*/) {
    if (__DEV__) { // eslint-disable-line no-undef
      $log.info('Initializing directive');
    }
  }
}
