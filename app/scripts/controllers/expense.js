'use strict';

angular.module('quarak')
  .controller('ExpenseCtrl', ['$scope', '$routeParams', 'Expense', 'Project', 'Session', function ($scope, $routeParams, Expense, Project, Session) {
    
    $scope.expenses = null;

    $scope.activeExpense = new Expense({
      date: new Date(),
      projectId: $routeParams.projectId,
      payer_id: Session.currentUser.id
    });

    $scope.save = function save(expense) {
      expense.member_ids = expense.members.map(function eachMember(member) {
        return member.id;
      });

      // Delete property so we don't send it to backend
      delete expense.members;

      if (!_.include($scope.expenses, expense)) {
        $scope.expenses.push(expense);
        expense.$save().then(function saved() {
          $scope.expenses = Expense.query({
            projectId: $routeParams.projectId
          });
        });
      }
      else {
        Expense.update(expense);
      }
      $scope.activeExpense = new Expense({
        date: new Date(),
        projectId: $routeParams.projectId,
        payer_id: Session.currentUser.id
      });
    }

    $scope.remove = function remove(expense) {
      var index = $scope.expenses.indexOf(expense);
      $scope.expenses.splice(index, 1);
      expense.$remove();
    }

    $scope.displayMembers = function displayMembers(members) {
      return members.map(function eachMember(member) {return member.name}).join(', ');
    };

    (function init() {
      $scope.project = Project.get({id: $routeParams.projectId});
      $scope.expenses = Expense.query({
        projectId: $routeParams.projectId
      });
    })();
  }]);
