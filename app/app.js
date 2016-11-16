'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
config(function($stateProvider) {

      var listState = {
        name: 'pokemonList',
        url: '/list',
        templateUrl: 'view1/view1.html',
        controller: 'View1Ctrl'
      };

      var detailState = {
        name: 'pokemonDetails',
        url: '/about',
        templateUrl: 'view2/view2.html',
        controller: 'View2Ctrl'
      };
      var otherState = {
        name: 'pokemonOther',
        url: '/other',
        templateUrl: 'view2/view2.html',
        controller: 'View2Ctrl'
      };

      $stateProvider.state(listState);
      $stateProvider.state(detailState);
});
