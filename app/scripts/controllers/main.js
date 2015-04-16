'use strict';

angular.module('quarak')
  .controller('MainCtrl', [
      '$scope',
      'Session',
      '$window',
      'Project',
    function(
      $scope,
      Session,
      $window,
      Project) {

    $scope.Session = Session;

    $scope.signIn = function(user) {
      Session.login(user.email, user.password);
    };

    $scope.signOut = function() {
      Session.logout();
    };

    $scope.projects = Project.query();
  }])
;
