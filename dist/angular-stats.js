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
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
var angular = __webpack_require__(1);
var AngularStats = function () {
    function AngularStats($rootScope, $document, $window, $timeout) {
        this.digestInfo = { duration: "0" };
        this.rootScope = $rootScope;
        this.document = $document;
        this.window = $window;
        this.timeout = $timeout;
        this.startingElement = "app";
    }
    AngularStats.prototype.setStartingElement = function (element) {
        this.startingElement = element;
    };
    AngularStats.prototype.analyzeWebApp = function () {
        this.scopesList = [];
        this.watchersList = [];
        this.componentsInfo = {};
        this.domElementsCount = 0;
        this.nodeNameList = {};
        var element = this.document.find(this.startingElement);
        if (!element || element.length == 0) {
            throw Error(this.startingElement + " is not a valid selector");
        } else {
            this.analizeScope(this.rootScope);
            this.detectFromElement(element);
            this.calculateDigestDuration();
        }
        return this.composeMessage();
    };
    AngularStats.prototype.composeMessage = function () {
        var mex = "GENERAL\n";
        mex += "----------------------\n";
        mex += "Tot scopes: " + this.scopesList.length + "\n";
        mex += "Tot watchers: " + this.watchersList.length + "\n";
        mex += "Tot DOM Elements: " + this.domElementsCount + "\n";
        mex += "Digest duration: " + this.digestInfo.duration + " ms \n\n";
        mex += "\nCOMPONENTS\n";
        mex += "----------------------\n";
        for (var name_1 in this.componentsInfo) {
            mex += "- " + name_1.toUpperCase() + "\n" + "s: " + this.componentsInfo[name_1].scopesCount + ", w: " + this.componentsInfo[name_1].watchers.length + "\n";
        }
        mex += "\n\nHTMLElement\n";
        mex += "----------------------\n";
        for (var nodeName in this.nodeNameList) {
            mex += nodeName + ": " + this.nodeNameList[nodeName] + "\n";
        }
        return mex;
    };
    AngularStats.prototype.analizeScope = function (currentScope) {
        var _this = this;
        if (this.scopesList.indexOf(currentScope) == -1) {
            this.scopesList.push(currentScope);
            var name_2 = currentScope["$ctrl"] ? currentScope["$ctrl"]["name"] : currentScope["name"] ? currentScope["name"] : "Unknown";
            if (this.componentsInfo[name_2] == undefined) {
                this.componentsInfo[name_2] = {
                    name: name_2, scopesCount: 1, watchers: []
                };
            } else {
                this.componentsInfo[name_2].scopesCount++;
            }
            angular.forEach(currentScope["$$watchers"], function (watcher) {
                if (_this.watchersList.indexOf(watcher) == -1) _this.watchersList.push(watcher);
                if (_this.componentsInfo[name_2].watchers.indexOf(watcher) == -1) _this.componentsInfo[name_2].watchers.push(watcher);
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
    };
    AngularStats.prototype.detectFromElement = function (element) {
        var _this = this;
        this.domElementsCount++;
        if (element.data().hasOwnProperty("$scope")) this.analizeScope(element.data()["$scope"]);
        angular.forEach(element.children(), function (childElement) {
            if (_this.nodeNameList[childElement.nodeName] == undefined) {
                _this.nodeNameList[childElement.nodeName] = 1;
            } else {
                _this.nodeNameList[childElement.nodeName]++;
            }
            _this.detectFromElement(_this.document.find(childElement));
        });
    };
    AngularStats.prototype.calculateDigestDuration = function () {
        var _this = this;
        var duration = 0;
        var scopePrototype = Object.getPrototypeOf(this.rootScope);
        var angularDigest = scopePrototype.$digest;
        scopePrototype.$digest = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var start = _this.getTime();
            angularDigest.apply(_this.rootScope, args);
            duration = _this.getTime() - start;
            _this.digestInfo.duration = duration.toFixed(2);
        };
    };
    ;
    AngularStats.prototype.getTime = function () {
        return performance ? performance.now() : this.getDate().getTime();
    };
    AngularStats.prototype.getDate = function () {
        return new Date();
    };
    return AngularStats;
}();
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
var angular = __webpack_require__(1);
var angular_stats_service_1 = __webpack_require__(0);
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