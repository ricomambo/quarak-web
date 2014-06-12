'use strict';

angular.module('quarak')
  .controller('MainCtrl', ['$scope', 'Session', '$window', function ($scope, Session, $window) {
    $scope.Session = Session;

    // TODO remove
    $scope.user = {
      email: 'ringo@test.com',
      password: 'Star1234'
    };

    $scope.signIn = function signIn(user) {
      Session.login(user.email, user.password);
    };
  }])
;
