'use strict';

angular.module('quarak')
  .factory('Project', ['$resource', function($resource) {
    var Project = $resource(
      '/api/projects/:id',
      { id: '@id' },
      { update: {
        method: 'PUT' }
      }
    );

    return Project;
  }]);
