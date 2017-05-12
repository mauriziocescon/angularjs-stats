(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"));
	else if(typeof define === 'function' && define.amd)
		define(["angular"], factory);
	else if(typeof exports === 'object')
		exports["AngularStats"] = factory(require("angular"));
	else
		root["AngularStats"] = factory(root["angular"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const angular = __webpack_require__(1);
class AngularStats {
    constructor($rootScope, $document, $window, $timeout) {
        this.digestInfo = { duration: "0" };
        this.rootScope = $rootScope;
        this.document = $document;
        this.window = $window;
        this.timeout = $timeout;
        this.startingElement = this.document[0].querySelector("app");
    }
    setStartingElement(element) {
        this.startingElement = element;
    }
    analyzeWebApp() {
        this.scopesList = [];
        this.watchersList = [];
        this.componentsInfo = {};
        this.domElementsCount = 0;
        this.nodeNameList = {};
        let element = this.document.find(this.startingElement);
        if (!element || element.length === 0) {
            throw Error(this.startingElement + " is not a valid selector");
        } else {
            this.analizeScope(this.rootScope);
            this.detectFromElement(element);
            this.calculateDigestDuration();
        }
        return this.composeMessage();
    }
    composeMessage() {
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
    analizeScope(currentScope) {
        if (this.scopesList.indexOf(currentScope) === -1) {
            this.scopesList.push(currentScope);
            const name = currentScope["$ctrl"] ? currentScope["$ctrl"]["name"] : currentScope["name"] ? currentScope["name"] : "Unknown";
            if (this.componentsInfo[name] === undefined) {
                this.componentsInfo[name] = {
                    name: name, scopesCount: 1, watchers: []
                };
            } else {
                this.componentsInfo[name].scopesCount++;
            }
            angular.forEach(currentScope["$$watchers"], watcher => {
                if (this.watchersList.indexOf(watcher) === -1) this.watchersList.push(watcher);
                if (this.componentsInfo[name].watchers.indexOf(watcher) === -1) this.componentsInfo[name].watchers.push(watcher);
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
    detectFromElement(element) {
        this.domElementsCount++;
        if (element.data().hasOwnProperty("$scope")) this.analizeScope(element.data()["$scope"]);
        angular.forEach(element.children(), childElement => {
            if (this.nodeNameList[childElement.nodeName] === undefined) {
                this.nodeNameList[childElement.nodeName] = 1;
            } else {
                this.nodeNameList[childElement.nodeName]++;
            }
            this.detectFromElement(this.document.find(childElement));
        });
    }
    calculateDigestDuration() {
        let duration = 0;
        let scopePrototype = Object.getPrototypeOf(this.rootScope);
        let angularDigest = scopePrototype.$digest;
        scopePrototype.$digest = (...args) => {
            let start = this.getTime();
            angularDigest.apply(this.rootScope, args);
            duration = this.getTime() - start;
            this.digestInfo.duration = duration.toFixed(2);
        };
    }

    getTime() {
        return performance ? performance.now() : this.getDate().getTime();
    }
    getDate() {
        return new Date();
    }
}
AngularStats.$inject = ["$rootScope", "$document", "$window", "$timeout"];
exports.AngularStats = AngularStats;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const angular = __webpack_require__(1);
const angular_stats_service_1 = __webpack_require__(0);
exports.angularStats = angular.module("angular-stats", []).service("AngularStats", angular_stats_service_1.AngularStats).name;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var angular_stats_module_1 = __webpack_require__(2);
exports.angularStats = angular_stats_module_1.angularStats;
var angular_stats_service_1 = __webpack_require__(0);
exports.AngularStats = angular_stats_service_1.AngularStats;

/***/ })
/******/ ]);
});
//# sourceMappingURL=angular-stats.js.map