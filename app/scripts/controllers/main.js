'use strict';

angular.module('quarak')
  .controller('MainCtrl', ['$scope', 'Session', '$window', 'Project', '$timeout',
    function($scope, Session, $window, Project, $timeout) {

    $scope.Session = Session;

    $scope.signIn = function(user) {
      $scope.alerts = [];
      Session.login(user.email, user.password).then(null, function() {
        $scope.addAlert({type: 'danger', message: 'Error: email or password incorrect.'});
      });
    };

    $scope.signOut = function() {
      Session.logout();
    };

    $scope.projects = Project.query();

    $scope.alerts = [];

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

    $scope.addAlert = function(alert) {
      $scope.alerts.push(alert);
      if(alert.type != 'danger') {
        $timeout(function() {
          $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
        }, 3000);
      }
    };

    $scope.$on('$locationChangeStart', function(event) {
      $scope.alerts = [];
    });
  }])
;
