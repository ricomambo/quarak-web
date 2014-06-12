'use strict';

angular.module('quarak')
  .factory('Session', ['$q', '$http', '$window', function($q, $http, $window) {
    var service = {

      // currentUser
      currentUser: null,

      // Is user already authenticated?
      signedIn: false,

      // Authenticate user
      login: function login(email, password) {

        var user = {
          email: email,
          password: password
        };

        var defer = $q.defer();

        $http
          .post('/api/users/sign_in', {user: user})
          .success(function (data, status, headers, config) {
            $window.sessionStorage.token = data.user.authentication_token;
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

      requestCurrentUser: function requestCurrentUser() {
        var defer = $q.defer();
        if (!service.signedIn) {
          $http
            .get('/api/profile')
            .success(function profile(user) {
              service.signedIn = true;
              service.currentUser = user;
              defer.resolve(service.currentUser);
            })
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
