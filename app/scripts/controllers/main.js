'use strict';

angular.module('quarak')
  .controller('MainCtrl', ['$scope', '$location', 'Session', 'Project', '$timeout',
    function($scope, $location, Session, Project, $timeout) {

    $scope.Session = Session;

    $scope.signIn = function(user) {
      $scope.alerts = [];
      Session.login(user.email, user.password).then(function() {
        $scope.getProjects();
      }, function() {
        $scope.addAlert({type: 'danger', message: 'Error: email or password incorrect.'});
      });
    };

    $scope.signOut = function() {
      Session.logout();
    };

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

    $scope.getProjects = function() {
      Project.query().$promise.then(function(projects) {
        $scope.projects = projects;
        $scope.setActiveProject(projects[0]);
      });
    };

    $scope.setActiveProject = function(project) {
      if(project !== $scope.activeProject) {
        $scope.activeProject = project;
        $location.path('/projects/' + project.id);
      }
    };

    if(Session.currentUser) {
      $scope.getProjects();
    }
  }])
;
