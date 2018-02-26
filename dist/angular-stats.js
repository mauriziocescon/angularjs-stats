(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"));
	else if(typeof define === 'function' && define.amd)
		define(["angular"], factory);
	else if(typeof exports === 'object')
		exports["AngularStats"] = factory(require("angular"));
	else
		root["AngularStats"] = factory(root["angular"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-string-literal
var angular = __webpack_require__(0);

var AngularStats = function () {
    function AngularStats(rootScope, document, window, timeout, logger) {
        _classCallCheck(this, AngularStats);

        this.rootScope = rootScope;
        this.document = document;
        this.window = window;
        this.timeout = timeout;
        this.logger = logger;
        this.digestInfo = { duration: "0" };
        this.startingElement = this.document.find("app");
    }

    _createClass(AngularStats, [{
        key: "setStartingElement",
        value: function setStartingElement(element) {
            this.startingElement = element;
        }
    }, {
        key: "analyzeWebApp",
        value: function analyzeWebApp() {
            this.scopesList = [];
            this.watchersList = [];
            this.componentsInfo = {};
            this.domElementsCount = 0;
            this.nodeNameList = {};
            if (!this.startingElement || this.startingElement.length === 0) {
                throw Error(this.startingElement + " is not a valid selector");
            } else {
                this.analizeScope(this.rootScope);
                this.detectFromElement(this.startingElement);
                this.calculateDigestDuration();
            }
            return this.composeMessage();
        }
    }, {
        key: "composeMessage",
        value: function composeMessage() {
            try {
                var mex = "GENERAL\n";
                mex += "----------------------\n";
                mex += "Tot scopes: " + this.scopesList.length + "\n";
                mex += "Tot watchers: " + this.watchersList.length + "\n";
                mex += "Tot DOM Elements: " + this.domElementsCount + "\n";
                mex += "Digest duration: " + this.digestInfo.duration + " ms \n\n";
                mex += "\nCOMPONENTS\n";
                mex += "----------------------\n";
                // tslint:disable-next-line:forin
                for (var name in this.componentsInfo) {
                    mex += "- " + name + "\n" + "s: " + this.componentsInfo[name].scopesCount + ", w: " + this.componentsInfo[name].watchers.length + "\n";
                }
                mex += "\n\nHTMLElement\n";
                mex += "----------------------\n";
                // tslint:disable-next-line:forin
                for (var nodeName in this.nodeNameList) {
                    mex += nodeName + ": " + this.nodeNameList[nodeName] + "\n";
                }
                return mex;
            } catch (e) {
                this.logger.error(e);
                return "Error";
            }
        }
    }, {
        key: "analizeScope",
        value: function analizeScope(currentScope) {
            var _this = this;

            try {
                if (this.scopesList.indexOf(currentScope) === -1) {
                    this.scopesList.push(currentScope);
                    var name = currentScope["$ctrl"] ? currentScope["$ctrl"]["name"] : currentScope["name"] ? currentScope["name"] : "Unknown";
                    if (this.componentsInfo[name] === undefined) {
                        this.componentsInfo[name] = {
                            name: name, scopesCount: 1, watchers: []
                        };
                    } else {
                        this.componentsInfo[name].scopesCount++;
                    }
                    angular.forEach(currentScope["$$watchers"], function (watcher) {
                        if (_this.watchersList.indexOf(watcher) === -1) {
                            _this.watchersList.push(watcher);
                        }
                        if (_this.componentsInfo[name].watchers.indexOf(watcher) === -1) {
                            _this.componentsInfo[name].watchers.push(watcher);
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
            } catch (e) {
                this.logger.error(e);
            }
        }
    }, {
        key: "detectFromElement",
        value: function detectFromElement(element) {
            var _this2 = this;

            try {
                this.domElementsCount++;
                if (angular.element(element).scope()) {
                    this.analizeScope(angular.element(element).scope());
                }
                angular.forEach(angular.element(element).children(), function (childElement) {
                    if (_this2.nodeNameList[childElement.nodeName] === undefined) {
                        _this2.nodeNameList[childElement.nodeName] = 1;
                    } else {
                        _this2.nodeNameList[childElement.nodeName]++;
                    }
                    _this2.detectFromElement(angular.element(childElement));
                });
            } catch (e) {
                this.logger.error(e);
            }
        }
    }, {
        key: "calculateDigestDuration",
        value: function calculateDigestDuration() {
            var _this3 = this;

            try {
                var duration = 0;
                var scopePrototype = Object.getPrototypeOf(this.rootScope);
                var angularDigest = scopePrototype.$digest;
                scopePrototype.$digest = function () {
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                    }

                    var start = _this3.getTime();
                    angularDigest.apply(_this3.rootScope, args);
                    duration = _this3.getTime() - start;
                    _this3.digestInfo.duration = duration.toFixed(2);
                };
            } catch (e) {
                this.logger.error(e);
            }
        }
    }, {
        key: "getTime",
        value: function getTime() {
            return performance ? performance.now() : this.getDate().getTime();
        }
    }, {
        key: "getDate",
        value: function getDate() {
            return new Date();
        }
    }]);

    return AngularStats;
}();

AngularStats.$inject = ["$rootScope", "$document", "$window", "$timeout", "$log"];
exports.AngularStats = AngularStats;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var angular_stats_module_1 = __webpack_require__(3);
exports.angularStats = angular_stats_module_1.angularStats;
var angular_stats_service_1 = __webpack_require__(1);
exports.AngularStats = angular_stats_service_1.AngularStats;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var angular_stats_service_1 = __webpack_require__(1);
exports.angularStats = angular.module("angular-stats", []).service("AngularStats", angular_stats_service_1.AngularStats).name;

/***/ })
/******/ ]);
});
//# sourceMappingURL=angular-stats.js.map