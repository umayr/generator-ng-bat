'use strict';

module.exports = component();

function component() {

  /* @ngInject */
  function controller($log) {
    if (__DEV__) { // eslint-disable-line no-undef
      $log.info('Initializing component');
    }
  }

  return {
    controller: controller,
    template: '<div></div>'
  };
}
