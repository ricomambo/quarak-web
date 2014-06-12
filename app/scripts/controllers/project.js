'use strict';

angular.module('quarak')
  .controller('ProjectCtrl', ['$scope', 'Project', function($scope, Project) {
    $scope.projects = Project.query();
    $scope.remove = function remove(project) {
      var index = $scope.projects.indexOf(project);
      $scope.projects.splice(index, 1);
      project.$remove();
    }
  }]);
