'use strict';

angular.module('quarakWebApp')
  .controller('ExpenseCtrl', function ($scope, Expense) {
    $scope.expenses = Expense.query();
  });
