(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"));
	else if(typeof define === 'function' && define.amd)
		define(["angular"], factory);
	else if(typeof exports === 'object')
		exports["AngularStats"] = factory(require("angular"));
	else
		root["AngularStats"] = factory(root["angular"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_angular__) {
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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/angular-stats/angular-stats.module.ts":
/*!***************************************************!*\
  !*** ./src/angular-stats/angular-stats.module.ts ***!
  \***************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar angular = __webpack_require__(/*! angular */ \"angular\");\nvar angular_stats_service_1 = __webpack_require__(/*! ./angular-stats.service */ \"./src/angular-stats/angular-stats.service.ts\");\nexports.angularStats = angular.module(\"angular-stats\", []).service(\"AngularStats\", angular_stats_service_1.AngularStats).name;\n\n//# sourceURL=webpack://AngularStats/./src/angular-stats/angular-stats.module.ts?");

/***/ }),

/***/ "./src/angular-stats/angular-stats.service.spec.ts":
/*!*********************************************************!*\
  !*** ./src/angular-stats/angular-stats.service.spec.ts ***!
  \*********************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar angular = __webpack_require__(/*! angular */ \"angular\");\n// Addition of angular-mocks and jasmine references is done on the gulpfile\ndescribe(\"ContactListController\", function () {\n    var rootScope = void 0;\n    var httpBackend = void 0;\n    var q = void 0;\n    // Set up the module\n    beforeEach(angular.mock.module(\"angular-stats\"));\n    beforeEach(inject(function ($rootScope, $httpBackend, $q) {\n        // Update ui\n        rootScope = $rootScope;\n        // Set up the mock http service responses\n        httpBackend = $httpBackend;\n        // Manage fake promises\n        q = $q;\n    }));\n    afterEach(function () {\n        httpBackend.verifyNoOutstandingExpectation();\n        httpBackend.verifyNoOutstandingRequest();\n    });\n    it(\"test\", function () {\n        expect(1).not.toBeUndefined(\"is not defined...\");\n    });\n});\n\n//# sourceURL=webpack://AngularStats/./src/angular-stats/angular-stats.service.spec.ts?");

/***/ }),

/***/ "./src/angular-stats/angular-stats.service.ts":
/*!****************************************************!*\
  !*** ./src/angular-stats/angular-stats.service.ts ***!
  \****************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\n// tslint:disable:no-string-literal\nvar angular = __webpack_require__(/*! angular */ \"angular\");\n\nvar AngularStats = function () {\n    function AngularStats(rootScope, document, window, timeout, logger) {\n        _classCallCheck(this, AngularStats);\n\n        this.rootScope = rootScope;\n        this.document = document;\n        this.window = window;\n        this.timeout = timeout;\n        this.logger = logger;\n        this.digestInfo = { duration: \"0\" };\n        this.startingElement = this.document.find(\"app\");\n    }\n\n    _createClass(AngularStats, [{\n        key: \"setStartingElement\",\n        value: function setStartingElement(element) {\n            this.startingElement = element;\n        }\n    }, {\n        key: \"analyzeWebApp\",\n        value: function analyzeWebApp() {\n            this.scopesList = [];\n            this.watchersList = [];\n            this.componentsInfo = {};\n            this.domElementsCount = 0;\n            this.nodeNameList = {};\n            if (!this.startingElement || this.startingElement.length === 0) {\n                throw Error(this.startingElement + \" is not a valid selector\");\n            } else {\n                this.analizeScope(this.rootScope);\n                this.detectFromElement(this.startingElement);\n                this.calculateDigestDuration();\n            }\n            return this.composeMessage();\n        }\n    }, {\n        key: \"composeMessage\",\n        value: function composeMessage() {\n            try {\n                var mex = \"GENERAL\\n\";\n                mex += \"----------------------\\n\";\n                mex += \"Tot scopes: \" + this.scopesList.length + \"\\n\";\n                mex += \"Tot watchers: \" + this.watchersList.length + \"\\n\";\n                mex += \"Tot DOM Elements: \" + this.domElementsCount + \"\\n\";\n                mex += \"Digest duration: \" + this.digestInfo.duration + \" ms \\n\\n\";\n                mex += \"\\nCOMPONENTS\\n\";\n                mex += \"----------------------\\n\";\n                // tslint:disable-next-line:forin\n                for (var name in this.componentsInfo) {\n                    mex += \"- \" + name + \"\\n\" + \"s: \" + this.componentsInfo[name].scopesCount + \", w: \" + this.componentsInfo[name].watchers.length + \"\\n\";\n                }\n                mex += \"\\n\\nHTMLElement\\n\";\n                mex += \"----------------------\\n\";\n                // tslint:disable-next-line:forin\n                for (var nodeName in this.nodeNameList) {\n                    mex += nodeName + \": \" + this.nodeNameList[nodeName] + \"\\n\";\n                }\n                return mex;\n            } catch (e) {\n                this.logger.error(e);\n                return \"Error\";\n            }\n        }\n    }, {\n        key: \"analizeScope\",\n        value: function analizeScope(currentScope) {\n            var _this = this;\n\n            try {\n                if (this.scopesList.indexOf(currentScope) === -1) {\n                    this.scopesList.push(currentScope);\n                    var name = currentScope[\"$ctrl\"] ? currentScope[\"$ctrl\"][\"name\"] : currentScope[\"name\"] ? currentScope[\"name\"] : \"Unknown\";\n                    if (this.componentsInfo[name] === undefined) {\n                        this.componentsInfo[name] = {\n                            name: name, scopesCount: 1, watchers: []\n                        };\n                    } else {\n                        this.componentsInfo[name].scopesCount++;\n                    }\n                    angular.forEach(currentScope[\"$$watchers\"], function (watcher) {\n                        if (_this.watchersList.indexOf(watcher) === -1) {\n                            _this.watchersList.push(watcher);\n                        }\n                        if (_this.componentsInfo[name].watchers.indexOf(watcher) === -1) {\n                            _this.componentsInfo[name].watchers.push(watcher);\n                        }\n                    });\n                    if (currentScope[\"$$childHead\"]) {\n                        this.analizeScope(currentScope[\"$$childHead\"]);\n                    }\n                    if (currentScope[\"$$childTail\"]) {\n                        this.analizeScope(currentScope[\"$$childTail\"]);\n                    }\n                    if (currentScope[\"$$prevSibling\"]) {\n                        this.analizeScope(currentScope[\"$$prevSibling\"]);\n                    }\n                    if (currentScope[\"$$nextSibling\"]) {\n                        this.analizeScope(currentScope[\"$$nextSibling\"]);\n                    }\n                }\n            } catch (e) {\n                this.logger.error(e);\n            }\n        }\n    }, {\n        key: \"detectFromElement\",\n        value: function detectFromElement(element) {\n            var _this2 = this;\n\n            try {\n                this.domElementsCount++;\n                if (angular.element(element).scope()) {\n                    this.analizeScope(angular.element(element).scope());\n                }\n                angular.forEach(angular.element(element).children(), function (childElement) {\n                    if (_this2.nodeNameList[childElement.nodeName] === undefined) {\n                        _this2.nodeNameList[childElement.nodeName] = 1;\n                    } else {\n                        _this2.nodeNameList[childElement.nodeName]++;\n                    }\n                    _this2.detectFromElement(angular.element(childElement));\n                });\n            } catch (e) {\n                this.logger.error(e);\n            }\n        }\n    }, {\n        key: \"calculateDigestDuration\",\n        value: function calculateDigestDuration() {\n            var _this3 = this;\n\n            try {\n                var duration = 0;\n                var scopePrototype = Object.getPrototypeOf(this.rootScope);\n                var angularDigest = scopePrototype.$digest;\n                scopePrototype.$digest = function () {\n                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n                        args[_key] = arguments[_key];\n                    }\n\n                    var start = _this3.getTime();\n                    angularDigest.apply(_this3.rootScope, args);\n                    duration = _this3.getTime() - start;\n                    _this3.digestInfo.duration = duration.toFixed(2);\n                };\n            } catch (e) {\n                this.logger.error(e);\n            }\n        }\n    }, {\n        key: \"getTime\",\n        value: function getTime() {\n            return performance ? performance.now() : this.getDate().getTime();\n        }\n    }, {\n        key: \"getDate\",\n        value: function getDate() {\n            return new Date();\n        }\n    }]);\n\n    return AngularStats;\n}();\n\nAngularStats.$inject = [\"$rootScope\", \"$document\", \"$window\", \"$timeout\", \"$log\"];\nexports.AngularStats = AngularStats;\n\n//# sourceURL=webpack://AngularStats/./src/angular-stats/angular-stats.service.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar angular_stats_module_1 = __webpack_require__(/*! ./angular-stats/angular-stats.module */ \"./src/angular-stats/angular-stats.module.ts\");\nexports.angularStats = angular_stats_module_1.angularStats;\nvar angular_stats_service_1 = __webpack_require__(/*! ./angular-stats/angular-stats.service */ \"./src/angular-stats/angular-stats.service.ts\");\nexports.AngularStats = angular_stats_service_1.AngularStats;\n\n//# sourceURL=webpack://AngularStats/./src/index.ts?");

/***/ }),

/***/ 0:
/*!******************************************************************************!*\
  !*** multi ./src/index.ts ./src/angular-stats/angular-stats.service.spec.ts ***!
  \******************************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./src/index.ts */\"./src/index.ts\");\nmodule.exports = __webpack_require__(/*! ./src/angular-stats/angular-stats.service.spec.ts */\"./src/angular-stats/angular-stats.service.spec.ts\");\n\n\n//# sourceURL=webpack://AngularStats/multi_./src/index.ts_./src/angular-stats/angular-stats.service.spec.ts?");

/***/ }),

/***/ "angular":
/*!**************************!*\
  !*** external "angular" ***!
  \**************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_angular__;\n\n//# sourceURL=webpack://AngularStats/external_%22angular%22?");

/***/ })

/******/ });
});