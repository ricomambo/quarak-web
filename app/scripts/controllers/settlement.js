'use strict';

angular.module('quarak')
  .controller('SettlementCtrl', ['$scope', '$routeParams', 'Settlement', 'Project', 'Session',
    function($scope, $routeParams, Settlement, Project, Session) {

      $scope.settlements = [];

      function resetActiveSettlement() {
        $scope.activeSettlement = new Settlement({
          projectId: $routeParams.projectId,
          payer_id: Session.currentUser.id
        });
      }

      function reloadSettlements() {
        $scope.settlements = Settlement.query({
          projectId: $routeParams.projectId
        });
      }

      $scope.save = function save(settlement) {
        settlement.$save(
          function(s, headers) {
            resetActiveSettlement();
            reloadSettlements();
          },
          function(response) {
            //TODO show errors on screen
            console.log(response);
          }
        );
      };

      $scope.remove = function remove(settlement) {};

      (function init() {
        $scope.project = Project.get({
          id: $routeParams.projectId
        });
        reloadSettlements();
        resetActiveSettlement();
      })();
    }
  ]);
