!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("angular")):"function"==typeof define&&define.amd?define(["angular"],t):"object"==typeof exports?exports.AngularStats=t(require("angular")):e.AngularStats=t(e.angular)}(this,function(e){return function(e){function __webpack_require__(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,__webpack_require__),r.l=!0,r.exports}var t={};return __webpack_require__.m=e,__webpack_require__.c=t,__webpack_require__.d=function(e,t,n){__webpack_require__.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},__webpack_require__.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return __webpack_require__.d(t,"a",t),t},__webpack_require__.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s=2)}([function(t,n){t.exports=e},function(e,t,n){"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var r=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}();Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),i=function(){function AngularStats(e,t,n,r,o){_classCallCheck(this,AngularStats),this.digestInfo={duration:"0"},this.rootScope=e,this.document=t,this.window=n,this.timeout=r,this.logger=o,this.startingElement=this.document.find("app")}return r(AngularStats,[{key:"setStartingElement",value:function(e){this.startingElement=e}},{key:"analyzeWebApp",value:function(){if(this.scopesList=[],this.watchersList=[],this.componentsInfo={},this.domElementsCount=0,this.nodeNameList={},!this.startingElement||0===this.startingElement.length)throw Error(this.startingElement+" is not a valid selector");return this.analizeScope(this.rootScope),this.detectFromElement(this.startingElement),this.calculateDigestDuration(),this.composeMessage()}},{key:"composeMessage",value:function(){try{var e="GENERAL\n";e+="----------------------\n",e+="Tot scopes: "+this.scopesList.length+"\n",e+="Tot watchers: "+this.watchersList.length+"\n",e+="Tot DOM Elements: "+this.domElementsCount+"\n",e+="Digest duration: "+this.digestInfo.duration+" ms \n\n",e+="\nCOMPONENTS\n",e+="----------------------\n";for(var t in this.componentsInfo)e+="- "+t+"\ns: "+this.componentsInfo[t].scopesCount+", w: "+this.componentsInfo[t].watchers.length+"\n";e+="\n\nHTMLElement\n",e+="----------------------\n";for(var n in this.nodeNameList)e+=n+": "+this.nodeNameList[n]+"\n";return e}catch(e){return this.logger.error(e),"Error"}}},{key:"analizeScope",value:function(e){var t=this;try{if(-1===this.scopesList.indexOf(e)){this.scopesList.push(e);var n=e.$ctrl?e.$ctrl.name:e.name?e.name:"Unknown";void 0===this.componentsInfo[n]?this.componentsInfo[n]={name:n,scopesCount:1,watchers:[]}:this.componentsInfo[n].scopesCount++,o.forEach(e.$$watchers,function(e){-1===t.watchersList.indexOf(e)&&t.watchersList.push(e),-1===t.componentsInfo[n].watchers.indexOf(e)&&t.componentsInfo[n].watchers.push(e)}),e.$$childHead&&this.analizeScope(e.$$childHead),e.$$childTail&&this.analizeScope(e.$$childTail),e.$$prevSibling&&this.analizeScope(e.$$prevSibling),e.$$nextSibling&&this.analizeScope(e.$$nextSibling)}}catch(e){this.logger.error(e)}}},{key:"detectFromElement",value:function(e){var t=this;try{this.domElementsCount++,o.element(e).scope()&&this.analizeScope(o.element(e).scope()),o.forEach(o.element(e).children(),function(e){void 0===t.nodeNameList[e.nodeName]?t.nodeNameList[e.nodeName]=1:t.nodeNameList[e.nodeName]++,t.detectFromElement(o.element(e))})}catch(e){this.logger.error(e)}}},{key:"calculateDigestDuration",value:function(){var e=this;try{var t=0,n=Object.getPrototypeOf(this.rootScope),r=n.$digest;n.$digest=function(){for(var n=arguments.length,o=Array(n),i=0;i<n;i++)o[i]=arguments[i];var a=e.getTime();r.apply(e.rootScope,o),t=e.getTime()-a,e.digestInfo.duration=t.toFixed(2)}}catch(e){this.logger.error(e)}}},{key:"getTime",value:function(){return performance?performance.now():this.getDate().getTime()}},{key:"getDate",value:function(){return new Date}}]),AngularStats}();i.$inject=["$rootScope","$document","$window","$timeout","$log"],t.AngularStats=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(3);t.angularStats=r.angularStats;var o=n(1);t.AngularStats=o.AngularStats},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=n(1);t.angularStats=r.module("angular-stats",[]).service("AngularStats",o.AngularStats).name}])});
//# sourceMappingURL=angular-stats.js.map