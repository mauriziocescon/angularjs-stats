import * as angular from 'angular';

// Addition of angular-mocks and jasmine references is done on the gulpfile
describe('ContactListController', () => {
  let rootScope: ng.IRootScopeService; // eslint-disable-line @typescript-eslint/no-unused-vars
  let httpBackend: ng.IHttpBackendService;
  let q: ng.IQService; // eslint-disable-line @typescript-eslint/no-unused-vars

  // Set up the module
  beforeEach(angular.mock.module('angular-stats'));

  beforeEach(inject(($rootScope: ng.IRootScopeService,
                     $httpBackend: ng.IHttpBackendService,
                     $q: ng.IQService) => {

    // Update ui
    rootScope = $rootScope;

    // Set up the mock http service responses
    httpBackend = $httpBackend;

    // Manage fake promises
    q = $q;
  }));

  afterEach(() => {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('test', () => {
    expect(1).not.toBeUndefined('is not defined...');
  });
});
