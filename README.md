Angular Stats
=========

This is a lightweight utility that gives you some statistics about you angular application. In particular, you get the 

1. number of scopes,
2. number of watchers,
3. number of DOM elements,

in your current view. For every angular component where you define the property ``name``, you also get 

4. Number of watchers per component.

Keep in mind that ``name`` has to be defined on your controller function or class, not binded to the controller scope. In the library there is also the interface for using it with ``Typescript``.

## Installation

npm install angular-stats --save

**Requirements:** angular 1.5+ (right now the utility is not working with angular 2.x)

## Usage

Register the module

```typescript
angular.module("myApp", ["angular-stats"]);
```

Than, somewhere in your code:
 
```typescript
import {analyzeWebApp} from "angular-stats";

var analisys = analyzeWebApp(); 
``` 