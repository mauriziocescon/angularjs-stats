import * as angular from "angular";
import { AngularStats } from "./angular-stats.service";

// Addition of angular-mocks and jasmine references is done on the gulpfile
describe("ContactListController", () => {
    let rootScope: ng.IRootScopeService;
    let httpBackend: ng.IHttpBackendService;
    let q: ng.IQService;

    // Set up the module
    beforeEach(angular.mock.module("angular-stats"));

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

    it("controller.contacts is not undefined after $onInit", () => {
        expect(1).not.toBeUndefined("controller.contacts is undefined...");
    });
});
