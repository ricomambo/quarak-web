'use strict';

angular.module('quarak')
  .factory('AuthInterceptor', ['$rootScope', '$q', '$window', function ($rootScope, $q, $window) {
    return {
      request: function (config) {
        config.headers = config.headers || {};
        if ($window.sessionStorage.token) {
          config.headers.Authorization = 'Token token=' + $window.sessionStorage.token;
        }
        return config;
      },
      responseError: function (rejection) {
        if (rejection.status === 401) {
          console.log("No autorizado!");
        }
        return $q.reject(rejection);
      }
    };
  }]);
