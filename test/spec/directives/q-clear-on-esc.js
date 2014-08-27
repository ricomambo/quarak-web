'use strict';

describe('Directive: qClearOnEsc', function() {

  // load the directive's module
  beforeEach(module('quarak'));

  var PROFILE = {
    'id': 1,
    'email': 'ringo@test.com',
    'name': 'Ringo Star',
    'token': 'DYqP_Ofy2uEw1pIwYj-67g'
  };

  var input,
    form,
    scope,
    $compile,
    $httpBackend;

  function compileInput(inputHtml) {
    input = angular.element(inputHtml);
    form = angular.element('<form name="form"></form>');
    form.append(input);
    $compile(form)(scope);
    scope.$digest();
  }

  beforeEach(inject(function($injector, $rootScope, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    $compile = $injector.get('$compile');
    $httpBackend.expectGET().respond(angular.copy(PROFILE));
    scope = $rootScope.$new();
  }));

  it('should clear the input when ESC key is pressed', function() {
    compileInput('<input type="text" ng-model="search" q-clear-on-esc>');

    scope.$apply(function() {
      scope.search = 'hola';
    });

    expect(scope.search).toBe('hola');
    expect(input.val()).toBe('hola');

    var e = angular.element.Event('keydown');
    e.which = 27;
    input.trigger(e);

    expect(scope.search).toBe('');
    expect(input.val()).toBe('');
  });
});
