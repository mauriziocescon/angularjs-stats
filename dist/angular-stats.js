(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var angular = require("angular");
var AngularStats = (function () {
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
        }
        else {
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
            var name_2 = currentScope["$ctrl"] ? currentScope["$ctrl"]["name"] : (currentScope["name"] ? currentScope["name"] : "Unknown");
            if (this.componentsInfo[name_2] == undefined) {
                this.componentsInfo[name_2] = {
                    name: name_2, scopesCount: 1, watchers: []
                };
            }
            else {
                this.componentsInfo[name_2].scopesCount++;
            }
            angular.forEach(currentScope["$$watchers"], function (watcher) {
                if (_this.watchersList.indexOf(watcher) == -1)
                    _this.watchersList.push(watcher);
                if (_this.componentsInfo[name_2].watchers.indexOf(watcher) == -1)
                    _this.componentsInfo[name_2].watchers.push(watcher);
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
        if (element.data().hasOwnProperty("$scope"))
            this.analizeScope(element.data()["$scope"]);
        angular.forEach(element.children(), function (childElement) {
            if (_this.nodeNameList[childElement.nodeName] == undefined) {
                _this.nodeNameList[childElement.nodeName] = 1;
            }
            else {
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
            var start = _this.getTimeFrom1970();
            angularDigest.apply(_this.rootScope, args);
            duration = _this.getTimeFrom1970() - start;
            _this.digestInfo.duration = duration.toFixed(2);
        };
    };
    ;
    AngularStats.prototype.getTimeFrom1970 = function () {
        return this.getNow().getTime();
    };
    AngularStats.prototype.getNow = function () {
        return new Date();
    };
    return AngularStats;
}());
AngularStats.$inject = ["$rootScope", "$document", "$window", "$timeout"];
exports.angularStats = angular.module("angularStats", [])
    .service("AngularStats", AngularStats)
    .name;

},{"angular":undefined}]},{},[1]);
