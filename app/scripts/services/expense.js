'use strict';

angular.module('quarak')
  .factory('Expense', function Expense($resource) {
    var Expense = $resource('/api/projects/:projectId/expenses/:id', {
        id: '@id',
        projectId: '@projectId'
      }, {
        update: {
          method: 'PUT'
        },
        remove: {
          method: 'DELETE',
          params: {
            projectId: '@project_id'
          }
        }
      }
    );

    return Expense;
  });
