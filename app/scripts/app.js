'use strict';

angular
  .module('quarak', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
      })
      .when('/projects', {
        templateUrl: 'views/project.html',
        controller: 'ProjectCtrl'
      })
      .when('/projects/:projectId/expenses', {
        templateUrl: 'views/expense.html',
        controller: 'ExpenseCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])

  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  }])

  .run(['Session', function(Session) {
    Session.requestCurrentUser();
  }])
;
