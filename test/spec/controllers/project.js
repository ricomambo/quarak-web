'use strict';

describe('Controller: ProjectCtrl', function() {

  // load the controller's module
  beforeEach(module('quarak'));

  var PROFILE = {
    'id': 1,
    'email': 'ringo@test.com',
    'name': 'Ringo Star',
    'token': 'DYqP_Ofy2uEw1pIwYj-67g'
  };

  var ProjectCtrl,
    scope,
    $httpBackend,
    $routeParams;

  var PROJECT_LIST = [{
    "id": 1,
    "title": "First Project",
    "members": [{
      "id": 1,
      "name": "John Lennon"
    }, {
      "id": 2,
      "name": "Ringo Star"
    }, {
      "id": 3,
      "name": "George Harrison"
    }]
  }, {
    "id": 2,
    "title": "Last Project",
    "members": [{
      "id": 2,
      "name": "Ringo Star"
    }, {
      "id": 3,
      "name": "George Harrison"
    }]
  }];

  var PROFILE = {
    "id": 2,
    "email": "ringo@test.com",
    "name": "Ringo Star",
    "token": "sa3KEhtzToELvDV-6mZx_Q"
  };

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, _$httpBackend_, _$routeParams_) {
    $routeParams = _$routeParams_;
    $httpBackend = _$httpBackend_;
    scope = $rootScope.$new();
    $httpBackend.expectGET('/api/profile').respond(angular.copy(PROFILE));
    $httpBackend.expectGET('/api/projects').respond(angular.copy(PROJECT_LIST));
    ProjectCtrl = $controller('ProjectCtrl', {
      $scope: scope
    });
    scope.$apply();
    $httpBackend.flush();
  }));

  it('should attach a list of projects to the scope', function() {
    expect(scope.projects.length).toBe(2);
  });
});
