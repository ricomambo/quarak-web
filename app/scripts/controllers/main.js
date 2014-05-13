'use strict';

angular.module('quarak')
  .controller('MainCtrl', function ($scope) {
    $scope.currentUser = {
      signedIn: false,
    };

    // TODO remove
    $scope.user = {
      email: 'user@quarak.com',
      password: 'no matter'
    };

    $scope.signIn = function signIn(user) {
      $scope.currentUser = angular.extend({}, user, {signedIn:true});
    }
  })
;
