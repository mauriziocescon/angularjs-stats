import * as angular from "angular";
import { AngularStats } from "./angular-stats.service";

// Addition of angular-mocks and jasmine references is done on the gulpfile
describe("ContactListController", () => {
    let rootScope: ng.IRootScopeService;
    let httpBackend: ng.IHttpBackendService;
    let q: ng.IQService;

    // Set up the module
    beforeEach(angular.mock.module("angular-stats"));

    beforeEach(inject((_$rootScope_, _$httpBackend_, _$q_) => {

        // Update ui
        rootScope = _$rootScope_;

        // Set up the mock http service responses
        httpBackend = _$httpBackend_;

        // Manage fake promises
        q = _$q_;
    }));

    afterEach(() => {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it("controller.contacts is not undefined after $onInit", () => {
        expect(1).not.toBeUndefined("controller.contacts is undefined...");
    });
});
