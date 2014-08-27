'use strict';

angular.module('quarak')
  .directive('qClearOnEsc', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function postLink(scope, element, attrs, ngModel) {
        element.on('keydown', function clearInput(event) {
          var key = event.which;
          scope.$apply(function applyClear() {

            // ESC key
            if (key === 27) {
              ngModel.$setViewValue('');
              ngModel.$render();
            }
          });
        });
      }
    };
  })
;
