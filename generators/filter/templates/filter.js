'use strict';

module.exports = filter;

/* @ngInject */
function filter() {
  return function (input) {
    return 'currency filter: ' + input;
  };
}
