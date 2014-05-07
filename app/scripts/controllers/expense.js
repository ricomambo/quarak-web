'use strict';

angular.module('quarak')
  .controller('ExpenseCtrl', ['$scope', 'Expense', function ($scope, Expense) {
    $scope.expenses = Expense.query();
    $scope.activeExpense = new Expense({date: new Date()});
    $scope.save = function save(expense) {
      if (!_.include($scope.expenses, expense)) {
        $scope.expenses.push(expense);
        expense.$save();
      }
      else {
        Expense.update(expense);
      }
      $scope.activeExpense = new Expense({date: new Date()});
    }
    $scope.remove = function remove(expense) {
      var index = $scope.expenses.indexOf(expense);
      $scope.expenses.splice(index, 1);
      expense.$remove();
    }
  }]);
