(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"));
	else if(typeof define === 'function' && define.amd)
		define(["angular"], factory);
	else if(typeof exports === 'object')
		exports["AngularStats"] = factory(require("angular"));
	else
		root["AngularStats"] = factory(root["angular"]);
})(self, (__WEBPACK_EXTERNAL_MODULE_angular__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "angular":
/*!**************************!*\
  !*** external "angular" ***!
  \**************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_angular__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!**********************************!*\
  !*** ./src/index.ts + 2 modules ***!
  \**********************************/

// UNUSED EXPORTS: AngularStats, angularStats

// EXTERNAL MODULE: external "angular"
var external_angular_ = __webpack_require__("angular");
;// CONCATENATED MODULE: ./src/angular-stats/angular-stats.service.ts

class AngularStats {
  rootScope;
  document;
  window;
  timeout;
  logger;
  static $inject = ['$rootScope', '$document', '$window', '$timeout', '$log'];
  scopesList;
  watchersList; // eslint-disable-line @typescript-eslint/no-explicit-any
  componentsInfo; // eslint-disable-line @typescript-eslint/no-explicit-any
  domElementsCount;
  nodeNameList; // eslint-disable-line @typescript-eslint/no-explicit-any
  startingElement;
  digestInfo = {
    duration: '0'
  };
  constructor(rootScope, document, window, timeout, logger) {
    this.rootScope = rootScope;
    this.document = document;
    this.window = window;
    this.timeout = timeout;
    this.logger = logger;
    this.startingElement = this.document.find('app');
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
    if (!this.startingElement || this.startingElement.length === 0) {
      throw Error(this.startingElement + ' is not a valid selector');
    } else {
      this.analizeScope(this.rootScope);
      this.detectFromElement(this.startingElement);
      this.calculateDigestDuration();
    }
    return this.composeMessage();
  }
  composeMessage() {
    try {
      let mex = 'GENERAL\n';
      mex += '----------------------\n';
      mex += 'Tot scopes: ' + this.scopesList.length + '\n';
      mex += 'Tot watchers: ' + this.watchersList.length + '\n';
      mex += 'Tot DOM Elements: ' + this.domElementsCount + '\n';
      mex += 'Digest duration: ' + this.digestInfo.duration + ' ms \n\n';
      mex += '\nCOMPONENTS\n';
      mex += '----------------------\n';
      for (const name in this.componentsInfo) {
        mex += '- ' + name + '\n' + 's: ' + this.componentsInfo[name].scopesCount + ', w: ' + this.componentsInfo[name].watchers.length + '\n';
      }
      mex += '\n\nHTMLElement\n';
      mex += '----------------------\n';
      for (const nodeName in this.nodeNameList) {
        mex += nodeName + ': ' + this.nodeNameList[nodeName] + '\n';
      }
      return mex;
    } catch (e) {
      this.logger.error(e);
      return 'Error';
    }
  }
  analizeScope(currentScope) {
    try {
      if (this.scopesList.indexOf(currentScope) === -1) {
        this.scopesList.push(currentScope);
        const name = currentScope['$ctrl'] ? currentScope['$ctrl']['name'] : currentScope['name'] ? currentScope['name'] : 'Unknown';
        if (this.componentsInfo[name] === undefined) {
          this.componentsInfo[name] = {
            name,
            scopesCount: 1,
            watchers: []
          };
        } else {
          this.componentsInfo[name].scopesCount++;
        }
        external_angular_.forEach(currentScope['$$watchers'], watcher => {
          if (this.watchersList.indexOf(watcher) === -1) {
            this.watchersList.push(watcher);
          }
          if (this.componentsInfo[name].watchers.indexOf(watcher) === -1) {
            this.componentsInfo[name].watchers.push(watcher);
          }
        });
        if (currentScope['$$childHead']) {
          this.analizeScope(currentScope['$$childHead']);
        }
        if (currentScope['$$childTail']) {
          this.analizeScope(currentScope['$$childTail']);
        }
        if (currentScope['$$prevSibling']) {
          this.analizeScope(currentScope['$$prevSibling']);
        }
        if (currentScope['$$nextSibling']) {
          this.analizeScope(currentScope['$$nextSibling']);
        }
      }
    } catch (e) {
      this.logger.error(e);
    }
  }
  detectFromElement(element) {
    try {
      this.domElementsCount++;
      if (external_angular_.element(element).scope()) {
        this.analizeScope(external_angular_.element(element).scope());
      }
      external_angular_.forEach(external_angular_.element(element).children(), childElement => {
        if (this.nodeNameList[childElement.nodeName] === undefined) {
          this.nodeNameList[childElement.nodeName] = 1;
        } else {
          this.nodeNameList[childElement.nodeName]++;
        }
        this.detectFromElement(external_angular_.element(childElement));
      });
    } catch (e) {
      this.logger.error(e);
    }
  }
  calculateDigestDuration() {
    var _this = this;
    try {
      let duration = 0;
      const scopePrototype = Object.getPrototypeOf(this.rootScope);
      const angularDigest = scopePrototype.$digest;
      scopePrototype.$digest = function () {
        const start = _this.getTime();
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        angularDigest.apply(_this.rootScope, args);
        duration = _this.getTime() - start;
        _this.digestInfo.duration = duration.toFixed(2);
      };
    } catch (e) {
      this.logger.error(e);
    }
  }
  getTime() {
    return performance ? performance.now() : this.getDate().getTime();
  }
  getDate() {
    return new Date();
  }
}
;// CONCATENATED MODULE: ./src/angular-stats/angular-stats.module.ts


const angularStats = external_angular_.module('angular-stats', []).service('AngularStats', AngularStats).name;
;// CONCATENATED MODULE: ./src/index.ts


})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!*********************************************************!*\
  !*** ./src/angular-stats/angular-stats.service.spec.ts ***!
  \*********************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);

// Addition of angular-mocks and jasmine references is done on the gulpfile
describe('ContactListController', () => {
  let rootScope; // eslint-disable-line @typescript-eslint/no-unused-vars
  let httpBackend;
  let q; // eslint-disable-line @typescript-eslint/no-unused-vars
  // Set up the module
  beforeEach(angular__WEBPACK_IMPORTED_MODULE_0__.mock.module('angular-stats'));
  beforeEach(inject(($rootScope, $httpBackend, $q) => {
    // Update ui
    rootScope = $rootScope;
    // Set up the mock http service responses
    httpBackend = $httpBackend;
    // Manage fake promises
    q = $q;
  }));
  afterEach(() => {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
  it('test', () => {
    expect(1).not.toBeUndefined('is not defined...');
  });
});
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QkFBYyxDQUFDLGVBQWUsRUFBRSxFQUFFLENBQUMsQ0FDNURnRSxPQUFPLENBQUMsY0FBYyxFQUFFL0QsWUFBWSxDQUFDLENBQ3JDMkIsSUFBSTs7QUNMNkQ7Ozs7Ozs7Ozs7OztBQ0FqQztBQUVuQztBQUNBcUMsUUFBUSxDQUFDLHVCQUF1QixFQUFFLE1BQUs7RUFDckMsSUFBSS9ELFNBQStCLENBQUMsQ0FBQztFQUNyQyxJQUFJZ0UsV0FBbUM7RUFDdkMsSUFBSUMsQ0FBZSxDQUFDLENBQUM7RUFFckI7RUFDQUMsVUFBVSxDQUFDcEUseUNBQVksQ0FBQytELE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztFQUVoREssVUFBVSxDQUFDRSxNQUFNLENBQUMsQ0FBQ0MsVUFBZ0MsRUFDaENDLFlBQW9DLEVBQ3BDQyxFQUFnQixLQUFJO0lBRXJDO0lBQ0F2RSxTQUFTLEdBQUdxRSxVQUFVO0lBRXRCO0lBQ0FMLFdBQVcsR0FBR00sWUFBWTtJQUUxQjtJQUNBTCxDQUFDLEdBQUdNLEVBQUU7RUFDUixDQUFDLENBQUMsQ0FBQztFQUVIQyxTQUFTLENBQUMsTUFBSztJQUNiUixXQUFXLENBQUNTLDhCQUE4QixFQUFFO0lBQzVDVCxXQUFXLENBQUNVLDBCQUEwQixFQUFFO0VBQzFDLENBQUMsQ0FBQztFQUVGQyxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQUs7SUFDZEMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDQyxHQUFHLENBQUNDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQztFQUNsRCxDQUFDLENBQUM7QUFDSixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL0FuZ3VsYXJTdGF0cy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vQW5ndWxhclN0YXRzL2V4dGVybmFsIHVtZCBcImFuZ3VsYXJcIiIsIndlYnBhY2s6Ly9Bbmd1bGFyU3RhdHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vQW5ndWxhclN0YXRzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL0FuZ3VsYXJTdGF0cy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vQW5ndWxhclN0YXRzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vQW5ndWxhclN0YXRzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vQW5ndWxhclN0YXRzLy4vc3JjL2FuZ3VsYXItc3RhdHMvYW5ndWxhci1zdGF0cy5zZXJ2aWNlLnRzIiwid2VicGFjazovL0FuZ3VsYXJTdGF0cy8uL3NyYy9hbmd1bGFyLXN0YXRzL2FuZ3VsYXItc3RhdHMubW9kdWxlLnRzIiwid2VicGFjazovL0FuZ3VsYXJTdGF0cy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9Bbmd1bGFyU3RhdHMvLi9zcmMvYW5ndWxhci1zdGF0cy9hbmd1bGFyLXN0YXRzLnNlcnZpY2Uuc3BlYy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJhbmd1bGFyXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImFuZ3VsYXJcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiQW5ndWxhclN0YXRzXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiYW5ndWxhclwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiQW5ndWxhclN0YXRzXCJdID0gZmFjdG9yeShyb290W1wiYW5ndWxhclwiXSk7XG59KShzZWxmLCAoX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9hbmd1bGFyX18pID0+IHtcbnJldHVybiAiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfYW5ndWxhcl9fOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIElBbmd1bGFyU3RhdHMge1xuICBzZXRTdGFydGluZ0VsZW1lbnQoZWxlbWVudDogSlFMaXRlKTogdm9pZDtcblxuICBhbmFseXplV2ViQXBwKCk6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJTdGF0cyBpbXBsZW1lbnRzIElBbmd1bGFyU3RhdHMge1xuICBwdWJsaWMgc3RhdGljICRpbmplY3QgPSBbJyRyb290U2NvcGUnLCAnJGRvY3VtZW50JywgJyR3aW5kb3cnLCAnJHRpbWVvdXQnLCAnJGxvZyddO1xuXG4gIHByaXZhdGUgc2NvcGVzTGlzdCE6IG5nLklTY29wZVtdO1xuICBwcml2YXRlIHdhdGNoZXJzTGlzdCE6IGFueVtdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgcHJpdmF0ZSBjb21wb25lbnRzSW5mbyE6IHsgW2tleTogc3RyaW5nXTogYW55IH07IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuXG4gIHByaXZhdGUgZG9tRWxlbWVudHNDb3VudCE6IG51bWJlcjtcbiAgcHJpdmF0ZSBub2RlTmFtZUxpc3QhOiB7IFtrZXk6IHN0cmluZ106IGFueSB9OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcblxuICBwcml2YXRlIHN0YXJ0aW5nRWxlbWVudDogSlFMaXRlO1xuICBwcml2YXRlIGRpZ2VzdEluZm8gPSB7IGR1cmF0aW9uOiAnMCcgfTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgZG9jdW1lbnQ6IG5nLklEb2N1bWVudFNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgd2luZG93OiBuZy5JV2luZG93U2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSB0aW1lb3V0OiBuZy5JVGltZW91dFNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgbG9nZ2VyOiBuZy5JTG9nU2VydmljZSkge1xuICAgIHRoaXMuc3RhcnRpbmdFbGVtZW50ID0gdGhpcy5kb2N1bWVudC5maW5kKCdhcHAnKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRTdGFydGluZ0VsZW1lbnQoZWxlbWVudDogSlFMaXRlKTogdm9pZCB7XG4gICAgdGhpcy5zdGFydGluZ0VsZW1lbnQgPSBlbGVtZW50O1xuICB9XG5cbiAgcHVibGljIGFuYWx5emVXZWJBcHAoKTogc3RyaW5nIHtcbiAgICB0aGlzLnNjb3Blc0xpc3QgPSBbXTtcbiAgICB0aGlzLndhdGNoZXJzTGlzdCA9IFtdO1xuICAgIHRoaXMuY29tcG9uZW50c0luZm8gPSB7fTtcblxuICAgIHRoaXMuZG9tRWxlbWVudHNDb3VudCA9IDA7XG4gICAgdGhpcy5ub2RlTmFtZUxpc3QgPSB7fTtcblxuICAgIGlmICghdGhpcy5zdGFydGluZ0VsZW1lbnQgfHwgdGhpcy5zdGFydGluZ0VsZW1lbnQubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBFcnJvcih0aGlzLnN0YXJ0aW5nRWxlbWVudCArICcgaXMgbm90IGEgdmFsaWQgc2VsZWN0b3InKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmFuYWxpemVTY29wZSh0aGlzLnJvb3RTY29wZSk7XG4gICAgICB0aGlzLmRldGVjdEZyb21FbGVtZW50KHRoaXMuc3RhcnRpbmdFbGVtZW50KTtcbiAgICAgIHRoaXMuY2FsY3VsYXRlRGlnZXN0RHVyYXRpb24oKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jb21wb3NlTWVzc2FnZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBjb21wb3NlTWVzc2FnZSgpOiBzdHJpbmcge1xuICAgIHRyeSB7XG4gICAgICBsZXQgbWV4ID0gJ0dFTkVSQUxcXG4nO1xuICAgICAgbWV4ICs9ICctLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxuJztcbiAgICAgIG1leCArPSAnVG90IHNjb3BlczogJyArIHRoaXMuc2NvcGVzTGlzdC5sZW5ndGggKyAnXFxuJztcbiAgICAgIG1leCArPSAnVG90IHdhdGNoZXJzOiAnICsgdGhpcy53YXRjaGVyc0xpc3QubGVuZ3RoICsgJ1xcbic7XG4gICAgICBtZXggKz0gJ1RvdCBET00gRWxlbWVudHM6ICcgKyB0aGlzLmRvbUVsZW1lbnRzQ291bnQgKyAnXFxuJztcbiAgICAgIG1leCArPSAnRGlnZXN0IGR1cmF0aW9uOiAnICsgdGhpcy5kaWdlc3RJbmZvLmR1cmF0aW9uICsgJyBtcyBcXG5cXG4nO1xuXG4gICAgICBtZXggKz0gJ1xcbkNPTVBPTkVOVFNcXG4nO1xuICAgICAgbWV4ICs9ICctLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxuJztcbiAgICAgIGZvciAoY29uc3QgbmFtZSBpbiB0aGlzLmNvbXBvbmVudHNJbmZvKSB7XG4gICAgICAgIG1leCArPSAnLSAnICsgbmFtZSArICdcXG4nICsgJ3M6ICcgKyB0aGlzLmNvbXBvbmVudHNJbmZvW25hbWVdLnNjb3Blc0NvdW50ICsgJywgdzogJyArIHRoaXMuY29tcG9uZW50c0luZm9bbmFtZV0ud2F0Y2hlcnMubGVuZ3RoICsgJ1xcbic7XG4gICAgICB9XG5cbiAgICAgIG1leCArPSAnXFxuXFxuSFRNTEVsZW1lbnRcXG4nO1xuICAgICAgbWV4ICs9ICctLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxuJztcbiAgICAgIGZvciAoY29uc3Qgbm9kZU5hbWUgaW4gdGhpcy5ub2RlTmFtZUxpc3QpIHtcbiAgICAgICAgbWV4ICs9IG5vZGVOYW1lICsgJzogJyArIHRoaXMubm9kZU5hbWVMaXN0W25vZGVOYW1lXSArICdcXG4nO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbWV4O1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoZSk7XG4gICAgICByZXR1cm4gJ0Vycm9yJztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFuYWxpemVTY29wZShjdXJyZW50U2NvcGU6IGFueSk6IHZvaWQgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICB0cnkge1xuICAgICAgaWYgKHRoaXMuc2NvcGVzTGlzdC5pbmRleE9mKGN1cnJlbnRTY29wZSkgPT09IC0xKSB7XG4gICAgICAgIHRoaXMuc2NvcGVzTGlzdC5wdXNoKGN1cnJlbnRTY29wZSk7XG5cbiAgICAgICAgY29uc3QgbmFtZSA9IGN1cnJlbnRTY29wZVsnJGN0cmwnXSA/IGN1cnJlbnRTY29wZVsnJGN0cmwnXVsnbmFtZSddIDogKGN1cnJlbnRTY29wZVsnbmFtZSddID8gY3VycmVudFNjb3BlWyduYW1lJ10gOiAnVW5rbm93bicpO1xuICAgICAgICBpZiAodGhpcy5jb21wb25lbnRzSW5mb1tuYW1lXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhpcy5jb21wb25lbnRzSW5mb1tuYW1lXSA9IHtcbiAgICAgICAgICAgIG5hbWUsIHNjb3Blc0NvdW50OiAxLCB3YXRjaGVyczogW10sXG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNvbXBvbmVudHNJbmZvW25hbWVdLnNjb3Blc0NvdW50Kys7XG4gICAgICAgIH1cblxuICAgICAgICBhbmd1bGFyLmZvckVhY2goY3VycmVudFNjb3BlWyckJHdhdGNoZXJzJ10sICh3YXRjaGVyKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMud2F0Y2hlcnNMaXN0LmluZGV4T2Yod2F0Y2hlcikgPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLndhdGNoZXJzTGlzdC5wdXNoKHdhdGNoZXIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLmNvbXBvbmVudHNJbmZvW25hbWVdLndhdGNoZXJzLmluZGV4T2Yod2F0Y2hlcikgPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudHNJbmZvW25hbWVdLndhdGNoZXJzLnB1c2god2F0Y2hlcik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoY3VycmVudFNjb3BlWyckJGNoaWxkSGVhZCddKSB7XG4gICAgICAgICAgdGhpcy5hbmFsaXplU2NvcGUoY3VycmVudFNjb3BlWyckJGNoaWxkSGVhZCddKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjdXJyZW50U2NvcGVbJyQkY2hpbGRUYWlsJ10pIHtcbiAgICAgICAgICB0aGlzLmFuYWxpemVTY29wZShjdXJyZW50U2NvcGVbJyQkY2hpbGRUYWlsJ10pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGN1cnJlbnRTY29wZVsnJCRwcmV2U2libGluZyddKSB7XG4gICAgICAgICAgdGhpcy5hbmFsaXplU2NvcGUoY3VycmVudFNjb3BlWyckJHByZXZTaWJsaW5nJ10pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGN1cnJlbnRTY29wZVsnJCRuZXh0U2libGluZyddKSB7XG4gICAgICAgICAgdGhpcy5hbmFsaXplU2NvcGUoY3VycmVudFNjb3BlWyckJG5leHRTaWJsaW5nJ10pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICB0aGlzLmxvZ2dlci5lcnJvcihlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRldGVjdEZyb21FbGVtZW50KGVsZW1lbnQ6IEpRTGl0ZSk6IHZvaWQge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmRvbUVsZW1lbnRzQ291bnQrKztcbiAgICAgIGlmIChhbmd1bGFyLmVsZW1lbnQoZWxlbWVudCkuc2NvcGUoKSkge1xuICAgICAgICB0aGlzLmFuYWxpemVTY29wZShhbmd1bGFyLmVsZW1lbnQoZWxlbWVudCkuc2NvcGUoKSk7XG4gICAgICB9XG5cbiAgICAgIGFuZ3VsYXIuZm9yRWFjaChhbmd1bGFyLmVsZW1lbnQoZWxlbWVudCkuY2hpbGRyZW4oKSwgKGNoaWxkRWxlbWVudDogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMubm9kZU5hbWVMaXN0W2NoaWxkRWxlbWVudC5ub2RlTmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMubm9kZU5hbWVMaXN0W2NoaWxkRWxlbWVudC5ub2RlTmFtZV0gPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubm9kZU5hbWVMaXN0W2NoaWxkRWxlbWVudC5ub2RlTmFtZV0rKztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRldGVjdEZyb21FbGVtZW50KGFuZ3VsYXIuZWxlbWVudChjaGlsZEVsZW1lbnQpKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjYWxjdWxhdGVEaWdlc3REdXJhdGlvbigpOiB2b2lkIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGR1cmF0aW9uID0gMDtcbiAgICAgIGNvbnN0IHNjb3BlUHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMucm9vdFNjb3BlKTtcbiAgICAgIGNvbnN0IGFuZ3VsYXJEaWdlc3QgPSBzY29wZVByb3RvdHlwZS4kZGlnZXN0O1xuXG4gICAgICBzY29wZVByb3RvdHlwZS4kZGlnZXN0ID0gKC4uLmFyZ3M6IGFueVtdKSA9PiB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMuZ2V0VGltZSgpO1xuICAgICAgICBhbmd1bGFyRGlnZXN0LmFwcGx5KHRoaXMucm9vdFNjb3BlLCBhcmdzKTtcbiAgICAgICAgZHVyYXRpb24gPSB0aGlzLmdldFRpbWUoKSAtIHN0YXJ0O1xuICAgICAgICB0aGlzLmRpZ2VzdEluZm8uZHVyYXRpb24gPSBkdXJhdGlvbi50b0ZpeGVkKDIpO1xuICAgICAgfTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMubG9nZ2VyLmVycm9yKGUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0VGltZSgpOiBudW1iZXIge1xuICAgIHJldHVybiBwZXJmb3JtYW5jZSA/IHBlcmZvcm1hbmNlLm5vdygpIDogdGhpcy5nZXREYXRlKCkuZ2V0VGltZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXREYXRlKCk6IERhdGUge1xuICAgIHJldHVybiBuZXcgRGF0ZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IHsgQW5ndWxhclN0YXRzIH0gZnJvbSAnLi9hbmd1bGFyLXN0YXRzLnNlcnZpY2UnO1xuXG5leHBvcnQgY29uc3QgYW5ndWxhclN0YXRzID0gYW5ndWxhci5tb2R1bGUoJ2FuZ3VsYXItc3RhdHMnLCBbXSlcbiAgLnNlcnZpY2UoJ0FuZ3VsYXJTdGF0cycsIEFuZ3VsYXJTdGF0cylcbiAgLm5hbWU7XG4iLCJleHBvcnQgeyBhbmd1bGFyU3RhdHMgfSBmcm9tICcuL2FuZ3VsYXItc3RhdHMvYW5ndWxhci1zdGF0cy5tb2R1bGUnO1xuZXhwb3J0IHsgQW5ndWxhclN0YXRzLCBJQW5ndWxhclN0YXRzIH0gZnJvbSAnLi9hbmd1bGFyLXN0YXRzL2FuZ3VsYXItc3RhdHMuc2VydmljZSc7XG4iLCJpbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuXG4vLyBBZGRpdGlvbiBvZiBhbmd1bGFyLW1vY2tzIGFuZCBqYXNtaW5lIHJlZmVyZW5jZXMgaXMgZG9uZSBvbiB0aGUgZ3VscGZpbGVcbmRlc2NyaWJlKCdDb250YWN0TGlzdENvbnRyb2xsZXInLCAoKSA9PiB7XG4gIGxldCByb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICBsZXQgaHR0cEJhY2tlbmQ6IG5nLklIdHRwQmFja2VuZFNlcnZpY2U7XG4gIGxldCBxOiBuZy5JUVNlcnZpY2U7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG5cbiAgLy8gU2V0IHVwIHRoZSBtb2R1bGVcbiAgYmVmb3JlRWFjaChhbmd1bGFyLm1vY2subW9kdWxlKCdhbmd1bGFyLXN0YXRzJykpO1xuXG4gIGJlZm9yZUVhY2goaW5qZWN0KCgkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSxcbiAgICAgICAgICAgICAgICAgICAgICRodHRwQmFja2VuZDogbmcuSUh0dHBCYWNrZW5kU2VydmljZSxcbiAgICAgICAgICAgICAgICAgICAgICRxOiBuZy5JUVNlcnZpY2UpID0+IHtcblxuICAgIC8vIFVwZGF0ZSB1aVxuICAgIHJvb3RTY29wZSA9ICRyb290U2NvcGU7XG5cbiAgICAvLyBTZXQgdXAgdGhlIG1vY2sgaHR0cCBzZXJ2aWNlIHJlc3BvbnNlc1xuICAgIGh0dHBCYWNrZW5kID0gJGh0dHBCYWNrZW5kO1xuXG4gICAgLy8gTWFuYWdlIGZha2UgcHJvbWlzZXNcbiAgICBxID0gJHE7XG4gIH0pKTtcblxuICBhZnRlckVhY2goKCkgPT4ge1xuICAgIGh0dHBCYWNrZW5kLnZlcmlmeU5vT3V0c3RhbmRpbmdFeHBlY3RhdGlvbigpO1xuICAgIGh0dHBCYWNrZW5kLnZlcmlmeU5vT3V0c3RhbmRpbmdSZXF1ZXN0KCk7XG4gIH0pO1xuXG4gIGl0KCd0ZXN0JywgKCkgPT4ge1xuICAgIGV4cGVjdCgxKS5ub3QudG9CZVVuZGVmaW5lZCgnaXMgbm90IGRlZmluZWQuLi4nKTtcbiAgfSk7XG59KTtcbiJdLCJuYW1lcyI6WyJhbmd1bGFyIiwiQW5ndWxhclN0YXRzIiwicm9vdFNjb3BlIiwiZG9jdW1lbnQiLCJ3aW5kb3ciLCJ0aW1lb3V0IiwibG9nZ2VyIiwiJGluamVjdCIsInNjb3Blc0xpc3QiLCJ3YXRjaGVyc0xpc3QiLCJjb21wb25lbnRzSW5mbyIsImRvbUVsZW1lbnRzQ291bnQiLCJub2RlTmFtZUxpc3QiLCJzdGFydGluZ0VsZW1lbnQiLCJkaWdlc3RJbmZvIiwiZHVyYXRpb24iLCJjb25zdHJ1Y3RvciIsImZpbmQiLCJzZXRTdGFydGluZ0VsZW1lbnQiLCJlbGVtZW50IiwiYW5hbHl6ZVdlYkFwcCIsImxlbmd0aCIsIkVycm9yIiwiYW5hbGl6ZVNjb3BlIiwiZGV0ZWN0RnJvbUVsZW1lbnQiLCJjYWxjdWxhdGVEaWdlc3REdXJhdGlvbiIsImNvbXBvc2VNZXNzYWdlIiwibWV4IiwibmFtZSIsInNjb3Blc0NvdW50Iiwid2F0Y2hlcnMiLCJub2RlTmFtZSIsImUiLCJlcnJvciIsImN1cnJlbnRTY29wZSIsImluZGV4T2YiLCJwdXNoIiwidW5kZWZpbmVkIiwiZm9yRWFjaCIsIndhdGNoZXIiLCJzY29wZSIsImNoaWxkcmVuIiwiY2hpbGRFbGVtZW50IiwiX3RoaXMiLCJzY29wZVByb3RvdHlwZSIsIk9iamVjdCIsImdldFByb3RvdHlwZU9mIiwiYW5ndWxhckRpZ2VzdCIsIiRkaWdlc3QiLCJzdGFydCIsImdldFRpbWUiLCJfbGVuIiwiYXJndW1lbnRzIiwiYXJncyIsIkFycmF5IiwiX2tleSIsImFwcGx5IiwidG9GaXhlZCIsInBlcmZvcm1hbmNlIiwibm93IiwiZ2V0RGF0ZSIsIkRhdGUiLCJhbmd1bGFyU3RhdHMiLCJtb2R1bGUiLCJzZXJ2aWNlIiwiZGVzY3JpYmUiLCJodHRwQmFja2VuZCIsInEiLCJiZWZvcmVFYWNoIiwibW9jayIsImluamVjdCIsIiRyb290U2NvcGUiLCIkaHR0cEJhY2tlbmQiLCIkcSIsImFmdGVyRWFjaCIsInZlcmlmeU5vT3V0c3RhbmRpbmdFeHBlY3RhdGlvbiIsInZlcmlmeU5vT3V0c3RhbmRpbmdSZXF1ZXN0IiwiaXQiLCJleHBlY3QiLCJub3QiLCJ0b0JlVW5kZWZpbmVkIl0sInNvdXJjZVJvb3QiOiIifQ==