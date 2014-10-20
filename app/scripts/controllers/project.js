'use strict';

angular.module('quarak')
  .controller('ProjectCtrl', ['$scope', '$routeParams', 'Expense', 'Project', 'Session',
    function($scope, $routeParams, Expense, Project, Balance, Session) {
      (function init() {
        $scope.project = Project.get({
          id: $routeParams.projectId
        });
        $scope.expenses = Expense.query({
          projectId: $routeParams.projectId
        });
        $scope.balances = Balance.query({
          projectId: $routeParams.projectId
        });
      })();
    }
  ]);
