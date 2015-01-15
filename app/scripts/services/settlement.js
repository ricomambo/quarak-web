'use strict';

angular.module('quarak')
  .factory('Settlement', function Settlement($resource) {
    var Settlement = $resource('http://quarak.herokuapp.com/api/projects/:projectId/settlements/:id', {
        id: '@id',
        projectId: '@projectId'
      }, {
        update: { method: 'PUT' },
        query: {
          method:'GET',
          isArray: true,
          transformResponse: function(data, headersGetter) {
            data = angular.fromJson(data);
            return data.settlements;
          }
        }
      }
    );

    return Settlement;
  });
