'use strict';

angular.module('quarak')
  .factory('Expense', function Expense($resource) {
    var Expense = $resource(
      '/api/expenses/:id.json',
      { id: '@id' },
      { update: {
        method: 'PUT' }
      }
    );

    return Expense;
  });
