'use strict';

angular.module('quarak')
  .factory('Expense', function Expense($resource) {
    var Expense = $resource('http://quarak.herokuapp.com/api/projects/:projectId/expenses/:id', {
        id: '@id',
        projectId: '@projectId'
      }, {
        update: {
          method: 'PUT'
        }
      }
    );

    return Expense;
  });
