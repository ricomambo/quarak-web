'use strict';

// FIXME: This controller is already too long!
//  Need to create services to move logic out of here
//  Too many dependencies
angular.module('quarak')
  .controller('ExpenseCtrl', [
    '$scope',
    '$routeParams',
    'Expense',
    'Project',
    'Session',
    '$window',
    function(
      $scope,
      $routeParams,
      Expense,
      Project,
      Session,
      $window) {

      $scope.expenses = null;

      $scope.dateFormat = 'yyyy-MM-dd';

      $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
      };

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
          expense.$save().then(function saved() {
            $scope.expenses.push(expense);
            $scope.activeExpense = new Expense({
              date: new Date(),
              projectId: $routeParams.projectId,
              payer_id: Session.currentUser.id,
              members: $scope.project.members
            });
          });
        } else {
          Expense.update(expense);
        }
      }

      $scope.remove = function remove(expense) {

        // FIXME: Move this string to the view, or somewhere else
        var deleteExpense = $window.confirm('Are you absolutely sure you want to delete?');

        if (deleteExpense) {
          var index = $scope.expenses.indexOf(expense);
          $scope.expenses.splice(index, 1);
          expense.$remove();
        }
      }

      $scope.displayMembers = function displayMembers(members) {
        return members.map(function eachMember(member) {
          return member.name;
        }).join(', ');
      };

      (function init() {
        Project.get({
          id: $routeParams.projectId
        }).$promise.then(function projectLoaded(project) {
          $scope.project = project;
          $scope.activeExpense.members = project.members;
        });
        $scope.expenses = Expense.query({
          projectId: $routeParams.projectId
        });
      })();
    }
  ]);
