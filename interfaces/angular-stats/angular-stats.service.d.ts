/// <reference types='angular' />
/// <reference types='angular-mocks' />
export interface IAngularStats {
    setStartingElement(element: JQLite): void;
    analyzeWebApp(): string;
}
export declare class AngularStats implements IAngularStats {
    private rootScope;
    private document;
    private window;
    private timeout;
    private logger;
    static $inject: string[];
    private scopesList;
    private watchersList;
    private componentsInfo;
    private domElementsCount;
    private nodeNameList;
    private startingElement;
    private digestInfo;
    constructor(rootScope: ng.IRootScopeService, document: ng.IDocumentService, window: ng.IWindowService, timeout: ng.ITimeoutService, logger: ng.ILogService);
    setStartingElement(element: JQLite): void;
    analyzeWebApp(): string;
    private composeMessage;
    private analizeScope;
    private detectFromElement;
    private calculateDigestDuration;
    private getTime;
    private getDate;
}
