'use strict';

angular.module('quarak')
  .controller('ProjectCtrl', ['$scope', '$routeParams', 'Expense', 'Project', 'Balance', 'Session',
    function($scope, $routeParams, Expense, Project, Balance, Session) {
      (function init() {

        $scope.project = Project.get({
          id: $routeParams.projectId
        });

        $scope.expenses = Expense.query({
          projectId: $routeParams.projectId,
          limit: 10
        });

        $scope.balances = Balance.query({
          projectId: $routeParams.projectId
        });

        Expense.by_month({
          projectId: $routeParams.projectId
        }).$promise.then(function(response){
          var data = [];
          var sum = 0;
          var count = 0;
          angular.forEach(response.array, function(amount, month){
            count++;
            sum += Math.ceil(parseInt(amount))
            data.push({
              x: month.substring(0, 7),
              y: [Math.ceil(parseInt(amount)), Math.ceil(sum / count)]
            })
          });
          $scope.monthChartData = {
            "series": ["Months", "Average"],
            "data": data
          };
        });

        $scope.monthChartConfig = {
          legend: {
            display: false,
            position: 'right'
          },
          lineLegend: 'traditional'
        };

        Expense.by_category({
          projectId: $routeParams.projectId
        }).$promise.then(function(response){
          var data = [];
          angular.forEach(response.array, function(amount, category){
            data.push({
              x: category,
              y: [Math.ceil(parseInt(amount))]
            })
          });
          $scope.categoryChartData = {
            "series": ["Categories"],
            "data": data
          };
        });

        $scope.categoryChartConfig = {
          legend: {
            display: true,
            position: 'right'
          }
        };

        $scope.onlyActive = true;

        $scope.filterByActive = function(balance) {
          if(!$scope.onlyActive || balance.member.active) return true;
          return false;
        };

        $scope.onlyOwnExpenses = true;

        $scope.filterByOwn = function(expense) {
          var members_ids = $.map(expense.members, function(member) { return member.id});
          if(!$scope.onlyOwnExpenses || $.inArray(Session.currentUser.id, members_ids) >= 0) return true;
          return false;
        };
      })();
    }
  ]);
