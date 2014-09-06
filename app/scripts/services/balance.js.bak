'use strict';

angular.module('quarak')
  .factory('Balance', function Balance($resource) {
    var Balance = $resource('/api/projects/:projectId/balance', {
        id: '@id',
        projectId: '@projectId'
      }
    );

    return Balance;
  });
