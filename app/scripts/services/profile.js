'use strict';

angular.module('quarak')
  .factory('Profile', ['$resource', function($resource) {
    var Profile = $resource(
      '/api/profile',
      {},
      { update: {
        method: 'PUT' }
      }
    );

    return Profile;
  }]);
