// tslint:disable:no-string-literal
import * as angular from "angular";

export interface IAngularStats {
    setStartingElement(element: JQLite): void;
    analyzeWebApp(): string;
}

export class AngularStats implements IAngularStats {
    public static $inject = ["$rootScope", "$document", "$window", "$timeout", "$log"];

    private rootScope: ng.IRootScopeService;
    private document: ng.IDocumentService;
    private window: ng.IWindowService;
    private timeout: ng.ITimeoutService;
    private logger: ng.ILogService;

    private scopesList: ng.IScope[];
    private watchersList: any[];
    private componentsInfo: {[key: string]: any};

    private domElementsCount: number;
    private nodeNameList: {[key: string]: any};

    private startingElement: JQLite;
    private digestInfo = {duration: "0"};

    constructor($rootScope: ng.IRootScopeService,
                $document: ng.IDocumentService,
                $window: ng.IWindowService,
                $timeout: ng.ITimeoutService,
                $log: ng.ILogService) {
        this.rootScope = $rootScope;
        this.document = $document;
        this.window = $window;
        this.timeout = $timeout;
        this.logger = $log;

        this.startingElement = this.document.find("app");
    }

    public setStartingElement(element: JQLite): void {
        this.startingElement = element;
    }

    public analyzeWebApp(): string {
        this.scopesList = [];
        this.watchersList = [];
        this.componentsInfo = {};

        this.domElementsCount = 0;
        this.nodeNameList = {};

        if (!this.startingElement || this.startingElement.length === 0) {
            throw Error(this.startingElement + " is not a valid selector");
        }
        else {
            this.analizeScope(this.rootScope);
            this.detectFromElement(this.startingElement);
            this.calculateDigestDuration();
        }

        return this.composeMessage();
    }

    private composeMessage(): string {
        try {
            let mex = "GENERAL\n";
            mex += "----------------------\n";
            mex += "Tot scopes: " + this.scopesList.length + "\n";
            mex += "Tot watchers: " + this.watchersList.length + "\n";
            mex += "Tot DOM Elements: " + this.domElementsCount + "\n";
            mex += "Digest duration: " + this.digestInfo.duration + " ms \n\n";

            mex += "\nCOMPONENTS\n";
            mex += "----------------------\n";
            // tslint:disable-next-line:forin
            for (const name in this.componentsInfo) {
                mex += "- " + name + "\n" + "s: " + this.componentsInfo[name].scopesCount + ", w: " + this.componentsInfo[name].watchers.length + "\n";
            }

            mex += "\n\nHTMLElement\n";
            mex += "----------------------\n";
            // tslint:disable-next-line:forin
            for (const nodeName in this.nodeNameList) {
                mex += nodeName + ": " + this.nodeNameList[nodeName] + "\n";
            }

            return mex;
        }
        catch (e) {
            this.logger.error(e);
            return "Error";
        }
    }

    private analizeScope(currentScope: any): void {
        try {
            if (this.scopesList.indexOf(currentScope) === -1) {
                this.scopesList.push(currentScope);

                const name = currentScope["$ctrl"] ? currentScope["$ctrl"]["name"] : (currentScope["name"] ? currentScope["name"] : "Unknown");
                if (this.componentsInfo[name] === undefined) {
                    this.componentsInfo[name] = {
                        name, scopesCount: 1, watchers: [],
                    };
                } else {
                    this.componentsInfo[name].scopesCount++;
                }

                angular.forEach(currentScope["$$watchers"], (watcher) => {
                    if (this.watchersList.indexOf(watcher) === -1) {
                        this.watchersList.push(watcher);
                    }

                    if (this.componentsInfo[name].watchers.indexOf(watcher) === -1) {
                        this.componentsInfo[name].watchers.push(watcher);
                    }
                });

                if (currentScope["$$childHead"]) {
                    this.analizeScope(currentScope["$$childHead"]);
                }

                if (currentScope["$$childTail"]) {
                    this.analizeScope(currentScope["$$childTail"]);
                }

                if (currentScope["$$prevSibling"]) {
                    this.analizeScope(currentScope["$$prevSibling"]);
                }

                if (currentScope["$$nextSibling"]) {
                    this.analizeScope(currentScope["$$nextSibling"]);
                }
            }
        }
        catch (e) {
            this.logger.error(e);
        }
    }

    private detectFromElement(element: JQLite): void {
        try {
            this.domElementsCount++;
            if (angular.element(element).scope()) {
                this.analizeScope(angular.element(element).scope());
            }

            angular.forEach(angular.element(element).children(), (childElement: HTMLElement) => {
                if (this.nodeNameList[childElement.nodeName] === undefined) {
                    this.nodeNameList[childElement.nodeName] = 1;
                } else {
                    this.nodeNameList[childElement.nodeName]++;
                }
                this.detectFromElement(angular.element(childElement));
            });
        }
        catch (e) {
            this.logger.error(e);
        }
    }

    private calculateDigestDuration(): void {
        try {
            let duration = 0;
            const scopePrototype = Object.getPrototypeOf(this.rootScope);
            const angularDigest = scopePrototype.$digest;

            scopePrototype.$digest = (...args: any[]) => {
                const start = this.getTime();
                angularDigest.apply(this.rootScope, args);
                duration = this.getTime() - start;
                this.digestInfo.duration = duration.toFixed(2);
            };
        }
        catch (e) {
            this.logger.error(e);
        }
    }

    private getTime(): number {
        return performance ? performance.now() : this.getDate().getTime();
    }

    private getDate(): Date {
        return new Date();
    }
}
