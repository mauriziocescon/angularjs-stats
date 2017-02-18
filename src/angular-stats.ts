class AngularStats {
	private rootScope: ng.IRootScopeService;
	private document: ng.IDocumentService;
	private window: ng.IWindowService;
	private timeout: ng.ITimeoutService;


	private scopesList: Array<any>;
	private watchersList: Array<any>;
	private componentsInfo: Object;

	private domElementsCount: number;
	private nodeNameList: Object;


	private startingElement: any;
	private digestInfo = {duration: "0"};

	static $inject = ["$rootScope", "$document", "$window", "$timeout"];

	constructor($rootScope: ng.IRootScopeService,
				$document: ng.IDocumentService,
				$window: ng.IWindowService,
				$timeout: ng.ITimeoutService) {
		this.rootScope = $rootScope;
		this.document = $document;
		this.window = $window;
		this.timeout = $timeout;

		this.startingElement = "app";
	}

	public setStartingElement(element: any): void {
		this.startingElement = element;
	}

	public analyzeWebApp(): string {
		this.scopesList = [];
		this.watchersList = [];
		this.componentsInfo = {};

		this.domElementsCount = 0;
		this.nodeNameList = {};

		let element = this.document.find(this.startingElement);
		if (!element || element.length == 0) {
			throw Error(this.startingElement + " is not a valid selector");
		}
		else {
			this.analizeScope(this.rootScope);
			this.detectFromElement(element);
			this.calculateDigestDuration();
		}

		return this.composeMessage();
	}

	private composeMessage(): string {

		let mex = "GENERAL\n";
		mex += "----------------------\n";
		mex += "Tot scopes: " + this.scopesList.length + "\n";
		mex += "Tot watchers: " + this.watchersList.length + "\n";
		mex += "Tot DOM Elements: " + this.domElementsCount + "\n";
		mex += "Digest duration: " + this.digestInfo.duration + " ms \n\n";

		mex += "\nCOMPONENTS\n";
		mex += "----------------------\n";
		for (let name in this.componentsInfo) {
			mex += "- " + name.toUpperCase() + "\n" + "s: " + this.componentsInfo[name].scopesCount + ", w: " + this.componentsInfo[name].watchers.length + "\n";
		}

		mex += "\n\nHTMLElement\n";
		mex += "----------------------\n";
		for (let nodeName in this.nodeNameList) {
			mex += nodeName + ": " + this.nodeNameList[nodeName] + "\n";
		}

		return mex;
	}

	private analizeScope(currentScope: ng.IScope): void {

		if (this.scopesList.indexOf(currentScope) == -1) {
			this.scopesList.push(currentScope);

			const name = currentScope["$ctrl"] ? currentScope["$ctrl"]["name"] : (currentScope["name"] ? currentScope["name"] : "Unknown");
			if (this.componentsInfo[name] == undefined) {
				this.componentsInfo[name] = {
					name: name, scopesCount: 1, watchers: []
				};
			} else {
				this.componentsInfo[name].scopesCount++;
			}

			angular.forEach(currentScope["$$watchers"], (watcher) => {
				if (this.watchersList.indexOf(watcher) == -1) this.watchersList.push(watcher);

				if (this.componentsInfo[name].watchers.indexOf(watcher) == -1) this.componentsInfo[name].watchers.push(watcher);
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

	private detectFromElement(element: any): void {

		this.domElementsCount++;
		if (element.data().hasOwnProperty("$scope")) this.analizeScope(element.data()["$scope"]);

		angular.forEach(element.children(), (childElement: HTMLElement) => {
			if (this.nodeNameList[childElement.nodeName] == undefined) {
				this.nodeNameList[childElement.nodeName] = 1;
			} else {
				this.nodeNameList[childElement.nodeName]++;
			}
			this.detectFromElement(this.document.find(childElement));
		});
	}

	private calculateDigestDuration(): void {
		let duration = 0;
		let scopePrototype = Object.getPrototypeOf(this.rootScope);
		let angularDigest = scopePrototype.$digest;

		scopePrototype.$digest = (...args) => {
			let start = this.getTimeFrom1970();
			angularDigest.apply(this.rootScope, args);
			duration = this.getTimeFrom1970() - start;
			this.digestInfo.duration = duration.toFixed(2);
		};
	};

	private getTimeFrom1970(): number {
		return this.getNow().getTime();
	}

	private getNow(): Date {
		return new Date();
	}
}

const angularStats = angular.module("angularStats", [])
	.service("AngularStats", AngularStats)
	.name;