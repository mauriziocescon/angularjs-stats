!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("angular")):"function"==typeof define&&define.amd?define(["angular"],t):"object"==typeof exports?exports.AngularStats=t(require("angular")):e.AngularStats=t(e.angular)}(self,(function(e){return(()=>{"use strict";var t={739:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.angularStats=void 0;var o=n(874),r=n(89);t.angularStats=o.module("angular-stats",[]).service("AngularStats",r.AngularStats).name},89:(e,t,n)=>{function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}Object.defineProperty(t,"__esModule",{value:!0}),t.AngularStats=void 0;var r=n(874),i=function(){function e(t,n,o,r,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.rootScope=t,this.document=n,this.window=o,this.timeout=r,this.logger=i,this.digestInfo={duration:"0"},this.startingElement=this.document.find("app")}var t,n;return t=e,n=[{key:"setStartingElement",value:function(e){this.startingElement=e}},{key:"analyzeWebApp",value:function(){if(this.scopesList=[],this.watchersList=[],this.componentsInfo={},this.domElementsCount=0,this.nodeNameList={},!this.startingElement||0===this.startingElement.length)throw Error(this.startingElement+" is not a valid selector");return this.analizeScope(this.rootScope),this.detectFromElement(this.startingElement),this.calculateDigestDuration(),this.composeMessage()}},{key:"composeMessage",value:function(){try{var e="GENERAL\n";for(var t in e+="----------------------\n",e+="Tot scopes: "+this.scopesList.length+"\n",e+="Tot watchers: "+this.watchersList.length+"\n",e+="Tot DOM Elements: "+this.domElementsCount+"\n",e+="Digest duration: "+this.digestInfo.duration+" ms \n\n",e+="\nCOMPONENTS\n",e+="----------------------\n",this.componentsInfo)e+="- "+t+"\ns: "+this.componentsInfo[t].scopesCount+", w: "+this.componentsInfo[t].watchers.length+"\n";for(var n in e+="\n\nHTMLElement\n",e+="----------------------\n",this.nodeNameList)e+=n+": "+this.nodeNameList[n]+"\n";return e}catch(e){return this.logger.error(e),"Error"}}},{key:"analizeScope",value:function(e){var t=this;try{if(-1===this.scopesList.indexOf(e)){this.scopesList.push(e);var n=e.$ctrl?e.$ctrl.name:e.name?e.name:"Unknown";void 0===this.componentsInfo[n]?this.componentsInfo[n]={name:n,scopesCount:1,watchers:[]}:this.componentsInfo[n].scopesCount++,r.forEach(e.$$watchers,(function(e){-1===t.watchersList.indexOf(e)&&t.watchersList.push(e),-1===t.componentsInfo[n].watchers.indexOf(e)&&t.componentsInfo[n].watchers.push(e)})),e.$$childHead&&this.analizeScope(e.$$childHead),e.$$childTail&&this.analizeScope(e.$$childTail),e.$$prevSibling&&this.analizeScope(e.$$prevSibling),e.$$nextSibling&&this.analizeScope(e.$$nextSibling)}}catch(e){this.logger.error(e)}}},{key:"detectFromElement",value:function(e){var t=this;try{this.domElementsCount++,r.element(e).scope()&&this.analizeScope(r.element(e).scope()),r.forEach(r.element(e).children(),(function(e){void 0===t.nodeNameList[e.nodeName]?t.nodeNameList[e.nodeName]=1:t.nodeNameList[e.nodeName]++,t.detectFromElement(r.element(e))}))}catch(e){this.logger.error(e)}}},{key:"calculateDigestDuration",value:function(){var e=this;try{var t=0,n=Object.getPrototypeOf(this.rootScope),o=n.$digest;n.$digest=function(){for(var n=e.getTime(),r=arguments.length,i=new Array(r),s=0;s<r;s++)i[s]=arguments[s];o.apply(e.rootScope,i),t=e.getTime()-n,e.digestInfo.duration=t.toFixed(2)}}catch(e){this.logger.error(e)}}},{key:"getTime",value:function(){return performance?performance.now():this.getDate().getTime()}},{key:"getDate",value:function(){return new Date}}],n&&o(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();t.AngularStats=i,i.$inject=["$rootScope","$document","$window","$timeout","$log"]},874:t=>{t.exports=e}},n={};function o(e){var r=n[e];if(void 0!==r)return r.exports;var i=n[e]={exports:{}};return t[e](i,i.exports,o),i.exports}var r={};return(()=>{var e=r;Object.defineProperty(e,"__esModule",{value:!0}),e.AngularStats=e.angularStats=void 0;var t=o(739);Object.defineProperty(e,"angularStats",{enumerable:!0,get:function(){return t.angularStats}});var n=o(89);Object.defineProperty(e,"AngularStats",{enumerable:!0,get:function(){return n.AngularStats}})})(),r})()}));