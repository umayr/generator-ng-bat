'use strict';

module.exports = routingEvents;

/* @ngInject */
function routingEvents($rootScope, $log) {

  var notFoundDeregistration = $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
    if (__DEV__) { // eslint-disable-line no-undef
      $log.info(event, unfoundState, fromState, fromParams);
    }
  });

  var changeSuccessDeregistration = $rootScope.$on('$stateChangeSuccess', function (event, toState/*, toParams, fromState, fromParams*/) {
    // Add Page Title.
    $rootScope.pageTitle = toState.title || 'Angular + Webpack = NgPack';
  });

  $rootScope.$on('$destroy', notFoundDeregistration);
  $rootScope.$on('$destroy', changeSuccessDeregistration);
}
