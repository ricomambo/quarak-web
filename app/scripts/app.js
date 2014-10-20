'use strict';

angular
  .module('quarak', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ui.bootstrap',
    'ui.utils'
  ])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
      })
      .when('/projects', {
        templateUrl: 'views/projects.html',
        controller: 'ProjectsCtrl'
      })
      .when('/projects/:projectId', {
        templateUrl: 'views/project.html',
        controller: 'ProjectCtrl'
      })
      .when('/projects/:projectId/expenses', {
        templateUrl: 'views/expense.html',
        controller: 'ExpenseCtrl'
      })
      .when('/projects/:projectId/settlements', {
        templateUrl: 'views/settlement.html',
        controller: 'SettlementCtrl'
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
