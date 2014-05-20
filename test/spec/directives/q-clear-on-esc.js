'use strict';

describe('Directive: qClearOnEsc', function () {

  // load the directive's module
  beforeEach(module('quarak'));

  var input,
      form,
      scope,
      $compile;

  function compileInput(inputHtml) {
    input = angular.element(inputHtml);
    form = angular.element('<form name="form"></form>');
    form.append(input);
    $compile(form)(scope);
    scope.$digest();
  }

  beforeEach(inject(function($injector, $rootScope) {
    $compile = $injector.get('$compile');
    scope = $rootScope.$new();
  }));

  it('should clear the input when ESC key is pressed', function() {
    compileInput('<input type="text" ng-model="search" q-clear-on-esc>');

    scope.$apply(function() {
      scope.search = 'hola';
    });

    expect(scope.search).toBe('hola');
    expect(input.val()).toBe('hola');

    var e = $.Event("keydown");
    e.which = 27;
    input.trigger(e);

    expect(scope.search).toBe('');
    expect(input.val()).toBe('');
  });
});
