'use strict';

angular.module('quarak')
  .factory('AuthInterceptor', ['$rootScope', '$q', '$window', function ($rootScope, $q, $window) {
    return {
      request: function (config) {
        config.headers = config.headers || {};
        if ($window.sessionStorage.currentUser) {
          config.headers.Authorization = 'Token token=' + JSON.parse($window.sessionStorage.currentUser).token;
        }
        return config;
      },
      responseError: function (rejection) {
        if (rejection.status === 401) {
          console.log('Not authorized!');
        }
        return $q.reject(rejection);
      }
    };
  }]);
