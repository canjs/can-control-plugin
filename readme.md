@page can-control-plugin
@test src/test/test.html

# can-control-plugin

[![Build Status](https://travis-ci.org/canjs/can-control-plugin.png?branch=master)](https://travis-ci.org/canjs/can-control-plugin)

Registers a jQuery plugin function for Controls

## Installation

### ES6 use

With StealJS, you can import this module directly in a template that is autorendered:

```js
import plugin from 'can-control-plugin';
```

### CommonJS use

Use `require` to load `can-control-plugin` and everything else
needed to create a template that uses `can-control-plugin`:

```js
var plugin = require("can-control-plugin");
```

## AMD use

Configure the `can` and `jquery` paths and the `can-control-plugin` package:

```html
<script src="require.js"></script>
<script>
	require.config({
	    paths: {
	        "jquery": "node_modules/jquery/dist/jquery",
	        "can": "node_modules/canjs/dist/amd/can"
	    },
	    packages: [{
		    	name: 'can-control-plugin',
		    	location: 'node_modules/can-control-plugin/dist/amd',
		    	main: 'lib/can-control-plugin'
	    }]
	});
	require(["main-amd"], function(){});
</script>
```

### Standalone use

Load the `global` version of the plugin:

```html
<script src='./node_modules/can-control-plugin/dist/global/can-control-plugin.js'></script>
```

## Contributing

### Making a Build

To make a build of the distributables into `dist/` in the cloned repository run

```
npm install
node build
```

### Running the tests

Tests can run in the browser by opening a webserver and visiting the `test.html` page.
Automated tests that run the tests from the command line in Firefox can be run with

```
npm test
```
