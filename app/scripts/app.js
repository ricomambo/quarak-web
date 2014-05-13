'use strict';

angular
  .module('quarak', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
      })
      .when('/expenses', {
        templateUrl: 'views/expense.html',
        controller: 'ExpenseCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
