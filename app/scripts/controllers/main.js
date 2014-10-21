'use strict';

angular.module('quarak')
  .controller('MainCtrl', [
      '$scope',
      'Session',
      '$window',
    function(
      $scope,
      Session,
      $window) {

    $scope.Session = Session;

    $scope.signIn = function(user) {
      Session.login(user.email, user.password);
    };

    $scope.signOut = function() {
      Session.logout();
    };
  }])
;
