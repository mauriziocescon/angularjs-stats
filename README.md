Angular Stats
=========

This is a lightweight utility that gives you some statistics about you angular application. In particular, you get the 

1. number of scopes,
2. number of watchers,
3. number of DOM elements,
4. duration of digest cycles,

in your current view. For every angular component where you define the property ``name``, you also get 

5. Number of watchers per component.

Keep in mind that ``name`` has to be defined on your controller function or class, not binded to the controller scope. In the library there is also the interface for using it with ``Typescript``.

## Requirements

angular 1.5+ (right now the utility is not working with angular 2.x)

## Installation

``npm install angular-stats --save``

## Build

``npm run build``

## Usage

Register the module

```javascript
angular.module("myApp", ["angularStats"]);
```

Than, somewhere in your code:
 
```javascript
class AppController {

	static $inject = ["AngularStats"];

	constructor(AngularStats) {
	    this.angularStats = AngularStats;
	    
		this.name = "AppComponent";
	}

	$onInit() {
	    this.angularStats.setStartingElement("#ng-app");
	    let analisys = analyzeWebApp();
	}
} 
``` 