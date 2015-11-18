'use strict';

module.exports = configuration;

/* @ngInject */
function configuration(RestangularProvider) {
  RestangularProvider.setBaseUrl('/api');
}
