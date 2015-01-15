'use strict';

angular.module('quarak')
  .factory('Expense', function Expense($resource) {
    var Expense = $resource('http://quarak.herokuapp.com/api/projects/:projectId/expenses/:id', {
        id: '@id',
        projectId: '@projectId'
      }, {
        by_month: {
          url: '/api/projects/:projectId/expenses_by_month',
          method: 'GET',
          params: {
            projectId: '@projectId'
          }
        },
        by_category: {
          url: '/api/projects/:projectId/expenses_by_category',
          method: 'GET',
          params: {
            projectId: '@projectId'
          }
        },
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
