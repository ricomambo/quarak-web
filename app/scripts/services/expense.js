'use strict';

angular.module('quarakWebApp')
  .factory('Expense', function Expense($resource) {
    return $resource('/api/expenses/:id', {id: '@id'});
  });
