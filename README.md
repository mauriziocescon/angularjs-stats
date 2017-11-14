Angular Stats
=========

This is a lightweight utility that gives you some statistics about you angularjs application. In particular, you get the 

1. number of scopes,
2. number of watchers,
3. number of DOM elements,
4. duration of digest cycles,

For every angularjs component where you define the property ``name``, you get also 

5. Number of watchers per component.

The property ``name`` can be defined on your controller class or binded to the scope. The module has been developed usign ``Typescript`` and is exported as ``UMD``, so you can use a module resolver (Webpack / Browserify) in order to ``import`` it or add it globally. 

## Requirements

1. AngularJs 1.5+ (it doesn't require jQuery)

2. The utility is not working with angular >= 2.x

## Installation

``npm install angular-stats --save``

## Build

``npm run build``

## Usage

```typescript
// --- app.module.ts ---
// Typescript + ES2015 modules

import { angularStats } from "angular-stats";

export const app = angular.module("myApp", [angularStats])
    .component("app", AppComponent)
    .name;


// --- app.component.ts ---
// ...define your AppComponent using an AppController like this: 

import { IAngularStats } from "angular-stats";

export class AppController {
	private document: ng.IDocumentService;
	private angularStats: IAngularStats;
	
	static $inject = ["AngularStats"];

	constructor($document: ng.IDocumentService, 
	            AngularStats: IAngularStats) {
		this.document = $document;
	    this.angularStats = AngularStats;
	    this.name = "AppComponent";
	}
	
	get analysis(): string {
		return "<pre>" + this.angularStats.analyzeWebApp() + "</pre>";
	}

	$onInit() {
	    /**
	    * By default, AngularStats will search for
	     * an element like <app></app>. If you want 
	     * to change it, set a different starting
	     * element (element: JQLite)
        */
	    this.angularStats.setStartingElement(this.document.find("my-element"));
	}
}
``` 

```javascript
// Javascript

angular.module("myApp", ["angular-stats"])
    .controller("AppController", ["$scope", "AngularStats", function($scope, AngularStats) {
        
        this.$onInit = function() {
            $scope.name = "AppComponent";
            /**
            * By default, AngularStats will search for
             * an element like <app></app>. If you want 
             * to change it, set a different starting
             * element (element: JQLite)
            */
            AngularStats.setStartingElement($document.find("my-element"));
        };
        
        $scope.getStats = function() {
            return "<pre>" + AngularStats.analyzeWebApp() + "</pre>";
        };
}]);
``` 

If you bundle ``app`` and ``vendors`` in two different bundles, require the module using ``angular-stats``
