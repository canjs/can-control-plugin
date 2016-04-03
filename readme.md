@page can-control-plugin
@test src/test/test.html
@group can-control-plugin.static 0 Static
@group can-control-plugin.prototype 1 Prototype

## can-control-plugin

[![Build Status](https://travis-ci.org/canjs/can-control-plugin.png?branch=master)](https://travis-ci.org/canjs/can-control-plugin)

Registers a jQuery plugin function for Controls.

## Overview

The `can.Control.plugin` extension is a plugin for creating and accessing 
controls with jQuery helper methods.  It uses the control's [can.Construct.fullName fullName](https://canjs.com/docs/can.Construct.fullName.html) or a static [can.Control.plugin.static.pluginName pluginName] attribute for the name of the control.

For example, the following plugin:

	var Tabs = can.Control({
	  pluginName : 'tabs'
	},{
	  init : function(element, options, arg1){ },
	  update : function(options) {}
	})

Can now be created directly on the jQuery collection like:

    $(".tabs").tabs();
    
__Note:__ This plugin only supports jQuery.

### Invoking Methods

You can invoke methods on a control instance after its created through a few
different approaches.  

Once a controller is initialized on a DOM element, you can invoke a method by calling
the plugin with the method name followed by the parameters for that method.
When calling a method and it returns a value other than `undefined`, this value will
be returned. Otherwise the method call will return the jQuery object (for chaining).

	var MyTodo = can.Control({
	  pluginName : 'my_todo'
	}, {
	  addTask: function(name, task){
	    this.element.append(name + ": " + task)
	  },

	  getTasks : function() {
	    return this.element.text();
	  }
	});

	// Initialize MyTodo
	$('.my_todo').my_todo();
	
	// Calls addTask, returns the jQuery element
	$('.my_todo').my_todo("addTask", 'Brian', 'Sweep garage') // -> jQuery
	// Calls getTasks, returns the element text
	$('.my_todo').my_todo("getTasks") // -> Brian: Sweep garage

You can also retrieve the control instance and invoke the method directly.

	var control = $('.my_todo').control();
	control.addTask('Brian', 'Sweep garage');
	
For more information on this, see [jQuery.fn.control] or [jQuery.fn.controls].

### Demo

The following demo shows creating a plugin widget and then updating the widget's `times` variable
for each time the button was clicked.

@demo src/index.html

## Use

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
