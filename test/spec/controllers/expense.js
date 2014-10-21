'use strict';

describe('Controller: ExpenseCtrl', function() {

  // load the controller's module
  beforeEach(module('quarak'));

  var PROFILE = {
    'id': 1,
    'email': 'ringo@test.com',
    'name': 'Ringo Star',
    'token': 'DYqP_Ofy2uEw1pIwYj-67g'
  };

  var PROJECT = {
    'id': 1,
    'title': 'First Project',
    'members': [{
      'id': 1,
      'name': 'John Lennon'
    }, {
      'id': 2,
      'name': 'Ringo Star'
    }, {
      'id': 3,
      'name': 'George Harrison'
    }]
  };

  var EXPENSES = [{
    "id": 1,
    "project_id": 1,
    "date": "2014-03-25",
    "category": "Supermarket",
    "provider": "Walmart",
    "amount": 745.24,
    "comments": "Sample expense",
    "payer": {
      "id": 2,
      "name": "Ringo Star"
    },
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
  }];

  var NEW_EXPENSE = {
    "id":11,
    "date":"2014-08-27",
    "category":"Varios",
    "provider":"El Cholito",
    "amount":"1000.0",
    "comments":"Coca y puchos",
    "payer":{
      "id":2,
      "name":"Ringo Star"
    },
    "members":[
      {
        "id":2,
        "name":"Ringo Star",
        "active":true
      },
      {
        "id":3,
        "name":"George Harrison",
        "active":true
      }
    ]
  };

  var BALANCES = [{
      "member": {
        "id": 1,
        "name": "John Lennon",
        "active": true
      },
      "expenses": "248.413333333333333333333333333",
      "payments": "0.0",
      "paid_settlements": "0.0",
      "received_settlements": "0.0",
      "balance": "-248.413333333333333333333333333"
    }, {
      "member": {
        "id": 2,
        "name": "Ringo Star",
        "active": true
      },
      "expenses": "248.413333333333333333333333333",
      "payments": "745.24",
      "paid_settlements": "0.0",
      "received_settlements": "0.0",
      "balance": "496.826666666666666666666666667"
    }, {
      "member": {
        "id": 3,
        "name": "George Harrison",
        "active": true
      },
      "expenses": "248.413333333333333333333333333",
      "payments": "0.0",
      "paid_settlements": "0.0",
      "received_settlements": "0.0",
      "balance": "-248.413333333333333333333333333"
    }];

  var ExpenseCtrl,
    scope,
    routeParams,
    Session,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, _$routeParams_, _Session_, _$httpBackend_) {
    routeParams = _$routeParams_;
    $httpBackend = _$httpBackend_;
    Session = _Session_;
    Session.currentUser = {
      id: 1
    };

    // mock route param
    routeParams.projectId = 1;

    // a scope for the controller
    scope = $rootScope.$new();

    $httpBackend.expectGET('/api/profile').respond(angular.copy(PROFILE));
    $httpBackend.expectGET('/api/projects/1').respond(angular.copy(PROJECT));
    $httpBackend.expectGET('/api/projects/1/expenses').respond(angular.copy(EXPENSES));

    ExpenseCtrl = $controller('ExpenseCtrl', {
      $scope: scope
    });
    $httpBackend.flush();
  }));

  it('should fetch expenses', function() {
    expect(scope.expenses.length).toBe(1);
    expect(scope.activeExpense.members.length).toBe(3);
  });

  it('should save expenses', function() {
    scope.activeExpense.category = 'Varios';
    scope.activeExpense.comments = 'Coca y puchos';
    scope.activeExpense.date = '2014-08-27';
    scope.activeExpense.amount = '1000';
    scope.activeExpense.members = [{
      id: 2,
      name: 'Ringo Star'
    }, {
      id: 3,
      name: 'George Harrison'
    }];
    scope.activeExpense.payer = {
      id: 2,
      name: 'Ringo Star'
    };
    scope.activeExpense.provider = 'El Cholito';
    scope.save(scope.activeExpense);

    $httpBackend.expectPOST('/api/projects/1/expenses', {
      "date":"2014-08-27",
      "projectId":1,
      "payer_id":1,
      "category":"Varios",
      "comments":"Coca y puchos",
      "amount":"1000",
      "payer":{
        "id":2,
        "name":"Ringo Star"
      },
      "provider":"El Cholito",
      "member_ids":[2,3]
    }).respond(angular.copy(NEW_EXPENSE));
    $httpBackend.flush();

    // New expense object should be instantiated
    expect(scope.activeExpense.id).toEqual(null);
    expect(scope.activeExpense.provider).toEqual(null);
  });
});
