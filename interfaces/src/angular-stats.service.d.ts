/// <reference types="angular" />
/// <reference types="angular-mocks" />
export declare class AngularStats {
    private rootScope;
    private document;
    private window;
    private timeout;
    private scopesList;
    private watchersList;
    private componentsInfo;
    private domElementsCount;
    private nodeNameList;
    private startingElement;
    private digestInfo;
    static $inject: string[];
    constructor($rootScope: ng.IRootScopeService, $document: ng.IDocumentService, $window: ng.IWindowService, $timeout: ng.ITimeoutService);
    setStartingElement(element: any): void;
    analyzeWebApp(): string;
    private composeMessage();
    private analizeScope(currentScope);
    private detectFromElement(element);
    private calculateDigestDuration();
    private getTime();
    private getDate();
}
