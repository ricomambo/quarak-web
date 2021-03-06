'use strict';

angular
  .module('quarak', [
    'ui.gravatar',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ui.bootstrap',
    'ui.utils',
    'angularCharts'
  ])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
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
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])

  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  }])

  .run(['Session', function(Session) {
    Session.setCurrentUser();
  }])
;
