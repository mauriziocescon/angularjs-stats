!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("angular")):"function"==typeof define&&define.amd?define(["angular"],t):"object"==typeof exports?exports.AngularStats=t(require("angular")):e.AngularStats=t(e.angular)}(window,function(e){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(t,n){t.exports=e},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.AngularStats=void 0;var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(0));(t.AngularStats=function(){function e(t,n,o,r,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.rootScope=t,this.document=n,this.window=o,this.timeout=r,this.logger=i,this.digestInfo={duration:"0"},this.startingElement=this.document.find("app")}return o(e,[{key:"setStartingElement",value:function(e){this.startingElement=e}},{key:"analyzeWebApp",value:function(){if(this.scopesList=[],this.watchersList=[],this.componentsInfo={},this.domElementsCount=0,this.nodeNameList={},!this.startingElement||0===this.startingElement.length)throw Error(this.startingElement+" is not a valid selector");return this.analizeScope(this.rootScope),this.detectFromElement(this.startingElement),this.calculateDigestDuration(),this.composeMessage()}},{key:"composeMessage",value:function(){try{var e="GENERAL\n";for(var t in e+="----------------------\n",e+="Tot scopes: "+this.scopesList.length+"\n",e+="Tot watchers: "+this.watchersList.length+"\n",e+="Tot DOM Elements: "+this.domElementsCount+"\n",e+="Digest duration: "+this.digestInfo.duration+" ms \n\n",e+="\nCOMPONENTS\n",e+="----------------------\n",this.componentsInfo)e+="- "+t+"\ns: "+this.componentsInfo[t].scopesCount+", w: "+this.componentsInfo[t].watchers.length+"\n";for(var n in e+="\n\nHTMLElement\n",e+="----------------------\n",this.nodeNameList)e+=n+": "+this.nodeNameList[n]+"\n";return e}catch(e){return this.logger.error(e),"Error"}}},{key:"analizeScope",value:function(e){var t=this;try{if(-1===this.scopesList.indexOf(e)){this.scopesList.push(e);var n=e.$ctrl?e.$ctrl.name:e.name?e.name:"Unknown";void 0===this.componentsInfo[n]?this.componentsInfo[n]={name:n,scopesCount:1,watchers:[]}:this.componentsInfo[n].scopesCount++,r.forEach(e.$$watchers,function(e){-1===t.watchersList.indexOf(e)&&t.watchersList.push(e),-1===t.componentsInfo[n].watchers.indexOf(e)&&t.componentsInfo[n].watchers.push(e)}),e.$$childHead&&this.analizeScope(e.$$childHead),e.$$childTail&&this.analizeScope(e.$$childTail),e.$$prevSibling&&this.analizeScope(e.$$prevSibling),e.$$nextSibling&&this.analizeScope(e.$$nextSibling)}}catch(e){this.logger.error(e)}}},{key:"detectFromElement",value:function(e){var t=this;try{this.domElementsCount++,r.element(e).scope()&&this.analizeScope(r.element(e).scope()),r.forEach(r.element(e).children(),function(e){void 0===t.nodeNameList[e.nodeName]?t.nodeNameList[e.nodeName]=1:t.nodeNameList[e.nodeName]++,t.detectFromElement(r.element(e))})}catch(e){this.logger.error(e)}}},{key:"calculateDigestDuration",value:function(){var e=this;try{var t=0,n=Object.getPrototypeOf(this.rootScope),o=n.$digest;n.$digest=function(){for(var n=arguments.length,r=Array(n),i=0;i<n;i++)r[i]=arguments[i];var a=e.getTime();o.apply(e.rootScope,r),t=e.getTime()-a,e.digestInfo.duration=t.toFixed(2)}}catch(e){this.logger.error(e)}}},{key:"getTime",value:function(){return performance?performance.now():this.getDate().getTime()}},{key:"getDate",value:function(){return new Date}}]),e}()).$inject=["$rootScope","$document","$window","$timeout","$log"]},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(3);Object.defineProperty(t,"angularStats",{enumerable:!0,get:function(){return o.angularStats}});var r=n(1);Object.defineProperty(t,"AngularStats",{enumerable:!0,get:function(){return r.AngularStats}})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.angularStats=void 0;var o=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(0)),r=n(1);t.angularStats=o.module("angular-stats",[]).service("AngularStats",r.AngularStats).name}])});