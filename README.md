Angular Stats
=========

This is a lightweight utility that gives you some statistics about you angular application. In particular, you get the 

1. number of scopes,
2. number of watchers,
3. number of DOM elements,
4. duration of digest cycles,

For every angular component where you define the property ``name``, you get also 

5. Number of watchers per component.

The property ``name`` can be defined on your controller class or binded to the scope. In ``src`` there is also the ``Typescript`` interface.
You can either ``require`` it using CommonJS syntax (you need a module resolver) or load it using in a script. 

## Requirements

1. angular 1.5+ (right now the utility is not working with angular 2.x)
2. jQuery 2.x+

## Installation

``npm install angular-stats --save``

## Build

``npm run build``

## Usage

Using Typescript 
 
```typescript
export const app = angular.module("myApp", ["angular-stats"])
    .component("app", AppComponent)
    .name;

// ...define your AppComponent using an AppController like this: 

export class AppController {
	private angularStats: ng.mc.IAngularStats;
	
	static $inject = ["AngularStats"];

	constructor(AngularStats: ng.mc.IAngularStats) {
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
	     * point with a valid selector
        */
	    this.angularStats.setStartingElement("app");
	}
}
``` 
or pure Javascript 

```javascript
angular.module("myApp", ["angular-stats"])
    .controller("AppController", ["$scope", "AngularStats", function($scope, AngularStats) {
        
        this.$onInit = function() {
            $scope.name = "AppComponent";
            /**
            * By default, AngularStats will search for
             * an element like <app></app>. If you want 
             * to change it, set a different starting
             * point with a valid selector
            */
            AngularStats.setStartingElement("[ng-app]");
        }
        
        $scope.getStats = function() {
            return "<pre>" + AngularStats.analyzeWebApp() + "</pre>";
        }
}]);
``` 