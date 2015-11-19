'use strict';

require('./<%= feature %>.scss');

var name = module.exports = '<%= name %>.<%= feature %>';

angular
  .module(name, [])
  .config(configuration)
  .controller('<%= controller %>', require('./<%= feature %>.controller.js'))
;

function configuration($stateProvider) {
  $stateProvider
    .state('<%= feature %>', {
      url: '/<%= feature %>',
      template: require('./<%= feature %>.html'),
      controller: '<%= controller %> as vm',
      title: 'Welcome to Wayne Minor.'
    });
}
