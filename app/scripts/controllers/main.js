'use strict';

angular.module('quarak')
  .controller('MainCtrl', ['$scope', 'Session', '$window', function ($scope, Session, $window) {
    $scope.Session = Session;

    $scope.signIn = function signIn(user) {
      Session.login(user.email, user.password);
    };
  }])
;
