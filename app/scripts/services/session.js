'use strict';

angular.module('quarak')
  .factory('Session', ['$q', '$http', '$window', function($q, $http, $window) {
    var service = {

      currentUser: null,

      // logout
      logout: function() {
        return $http['delete']('/api/sign_out')
          .success(function (data, status, headers, config) {
            delete $window.sessionStorage.currentUser;
            service.currentUser = null;
          });
      },

      // Authenticate user
      login: function(email, password) {

        var user = {
          email: email,
          password: password
        };

        var defer = $q.defer();

        $http
          .post('/api/sign_in', user)
          .success(function (data, status, headers, config) {
            $window.sessionStorage.currentUser = JSON.stringify(data);
            service.currentUser = data;
            defer.resolve(data);
          })
          .error(function (data, status, headers, config) {
            // Erase the token if the user fails to log in
            delete $window.sessionStorage.currentUser;
            service.currentUser = null;
            defer.reject();
          });

        return defer.promise;
      },

      setCurrentUser: function() {
        if($window.sessionStorage.currentUser) {
          service.currentUser = JSON.parse($window.sessionStorage.currentUser);
        }
      }
    };

    // Public API here
    return service;
  }]);
