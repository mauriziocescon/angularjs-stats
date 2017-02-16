import * as angular from "angular";

export class AngularStats {
	private rootScope: ng.IRootScopeService;
	private document: ng.IDocumentService;
	private window: ng.IWindowService;
	private timeout: ng.ITimeoutService;

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
		const scopesList = [];
		const watchersList = [];
		const componentsInfo = {};

		let domElementsCount = 0;
		const nodeNameList = {};

		const analizeScope = (currentScope: ng.IScope) => {

			if (scopesList.indexOf(currentScope) == -1) {
				scopesList.push(currentScope);

				const name = currentScope["$ctrl"] ? currentScope["$ctrl"]["name"] : "Unknown";
				if (componentsInfo[name] == undefined) {
					componentsInfo[name] = {
						name: name, scopesCount: 1, watchers: []
					};
				} else {
					componentsInfo[name].scopesCount++;
				}

				angular.forEach(currentScope["$$watchers"], (watcher) => {
					if (watchersList.indexOf(watcher) == -1) watchersList.push(watcher);

					if (componentsInfo[name].watchers.indexOf(watcher) == -1) componentsInfo[name].watchers.push(watcher);
				});

				if (currentScope["$$childHead"]) {
					analizeScope(currentScope["$$childHead"]);
				}

				if (currentScope["$$childTail"]) {
					analizeScope(currentScope["$$childTail"]);
				}

				if (currentScope["$$prevSibling"]) {
					analizeScope(currentScope["$$prevSibling"]);
				}

				if (currentScope["$$nextSibling"]) {
					analizeScope(currentScope["$$nextSibling"]);
				}
			}
		};

		const detectFromElement = (element) => {
			domElementsCount++;
			if (element.data().hasOwnProperty("$scope")) analizeScope(element.data()["$scope"]);

			angular.forEach(element.children(), (childElement: HTMLElement) => {
				if (nodeNameList[childElement.nodeName] == undefined) {
					nodeNameList[childElement.nodeName] = 1;
				} else {
					nodeNameList[childElement.nodeName]++;
				}
				detectFromElement(this.document.find(childElement));
			});
		};

		const calculateDigestDuration = () => {
			let duration = 0;
			let scopePrototype = Object.getPrototypeOf(this.rootScope);
			let angularDigest = scopePrototype.$digest;

			scopePrototype.$digest = (...args) => {
				let start = performance ? performance.now() : this.getTimeFrom1970();
				angularDigest.apply(this.rootScope, args);
				duration = performance ? (performance.now() - start) : (this.getTimeFrom1970() - start);
				this.digestInfo.duration = duration.toFixed(2);
			};
		};

		analizeScope(this.rootScope);
		detectFromElement(this.document.find(this.startingElement));
		calculateDigestDuration();

		let mex = "GENERAL\n";
		mex += "----------------------\n";
		mex += "Tot scopes: " + scopesList.length + "\n";
		mex += "Tot watchers: " + watchersList.length + "\n";
		mex += "Tot DOM Elements: " + domElementsCount + "\n";
		mex += "Digest duration: " + this.digestInfo.duration + " ms \n\n";

		mex += "\nCOMPONENTS\n";
		mex += "----------------------\n";
		for (let name in componentsInfo) {
			mex += "- " + name.toUpperCase() + "\n" + "s: " + componentsInfo[name].scopesCount + ", w: " + componentsInfo[name].watchers.length + "\n";
		}

		mex += "\n\nHTMLElement\n";
		mex += "----------------------\n";
		for (let nodeName in nodeNameList) {
			mex += nodeName + ": " + nodeNameList[nodeName] + "\n";
		}

		return mex;
	}

	private getTimeFrom1970(): number {
		return this.getNow().getTime();
	}

	private getNow(): Date {
		return new Date();
	}
}