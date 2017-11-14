/// <reference types="angular" />
/// <reference types="angular-mocks" />
export interface IAngularStats {
    setStartingElement(element: JQLite): void;
    analyzeWebApp(): string;
}
export declare class AngularStats implements IAngularStats {
    static $inject: string[];
    private rootScope;
    private document;
    private window;
    private timeout;
    private logger;
    private scopesList;
    private watchersList;
    private componentsInfo;
    private domElementsCount;
    private nodeNameList;
    private startingElement;
    private digestInfo;
    constructor($rootScope: ng.IRootScopeService, $document: ng.IDocumentService, $window: ng.IWindowService, $timeout: ng.ITimeoutService, $log: ng.ILogService);
    setStartingElement(element: JQLite): void;
    analyzeWebApp(): string;
    private composeMessage();
    private analizeScope(currentScope);
    private detectFromElement(element);
    private calculateDigestDuration();
    private getTime();
    private getDate();
}
