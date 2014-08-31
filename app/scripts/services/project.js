'use strict';

angular.module('quarak')
  .factory('Project', ['$resource', function($resource) {
    var Project = $resource(
      'http://quarak.herokuapp.com/api/projects/:id',
      { id: '@id' },
      { update: {
        method: 'PUT' }
      }
    );

    return Project;
  }]);
