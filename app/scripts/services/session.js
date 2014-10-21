'use strict';

angular.module('quarak')
  .factory('Session', ['$q', '$http', '$window', function($q, $http, $window) {
    var service = {

      // currentUser
      currentUser: null,

      // Is user already authenticated?
      signedIn: false,

      // logout
      logout: function() {
        return $http['delete']('/api/sign_out')
          .success(function (data, status, headers, config) {
            delete $window.sessionStorage.token;
            service.signedIn = false;
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
            $window.sessionStorage.token = data.token;
            service.requestCurrentUser().then(function currentUser(user) {
              defer.resolve(service.currentUser);
            });
          })
          .error(function (data, status, headers, config) {
            // Erase the token if the user fails to log in
            delete $window.sessionStorage.token;
            service.signedIn = false;
            service.currentUser = null;
          });

        return defer.promise;
      },

      requestCurrentUser: function() {
        var defer = $q.defer();
        if (!service.signedIn) {
          $http
            .get('/api/profile')
            .success(function profile(user) {
              service.signedIn = true;
              service.currentUser = user;
              defer.resolve(service.currentUser);
            });
        }
        else {
          defer.resolve(service.currentUser);
        }

        return defer.promise;
      }
    };

    // Public API here
    return service;
  }]);
