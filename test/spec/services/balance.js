'use strict';

describe('Service: Balance', function () {

  // load the service's module
  beforeEach(module('quarak'));

  // instantiate service
  var Balance;
  beforeEach(inject(function (_Balance_) {
    Balance = _Balance_;
  }));

  it('should do something', function () {
    expect(!!Balance).toBe(true);
  });

});
