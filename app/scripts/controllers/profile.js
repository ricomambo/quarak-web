'use strict';

angular.module('quarak')
  .controller('ProfileCtrl', ['$scope', '$routeParams', 'Profile',
    function($scope, $routeParams, Profile) {

      $scope.save = function save() {
        $scope.inProgress = true;
        $scope.profile.$update(
          function() {
            $scope.inProgress = false;
            $scope.addAlert({type: 'success', msg: 'Profile successfully saved.'});
          },
          function(response) {
            $scope.inProgress = false;
            for(var key in response.data) {
              $scope.addAlert({type: 'danger', msg: response.data[key][0]});
            }
          }
        );
      };

      (function init() {
        $scope.profile = Profile.get();
      })();
    }
  ]);
