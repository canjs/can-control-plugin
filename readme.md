# can-control-plugin (DEPRECATED)

[![Greenkeeper badge](https://badges.greenkeeper.io/canjs/can-control-plugin.svg)](https://greenkeeper.io/)

**can-control-plugin is deprecated**

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

*See: src/index.html*

The demo shows creating a plugin widget and then updating the widget's `times` variable for each time the button was clicked.

## API

### Static

#### `{String} pluginName`

Allows you to define the name of the jQuery plugin.

	var Filler = can.Control({
		pluginName: 'fillWith'
	},{});

	$("#foo").fillWith();

Setting the static `pluginName` property allows you to override the default name with your own.

If you don't provide a `pluginName`, the control falls back to the fullName attribute:

	can.Control('Ui.Layout.FillWith', {}, {});
	$("#foo").ui_layout_fill_with();

### Prototype

#### `jQuery.fn.controls([type])`

- Param: `{String|can.Control}` control - The type of Controls to find
- Return `{can.Control}` - The controls associated with the given elements.

When the widget is initialized, the plugin control creates an array
of control instance(s) with the DOM element it was initialized on using
[can.data](https://canjs.com/docs/can.data.html) method.

The `controls` method allows you to get the control instance(s) for any element
either by their type or pluginName.

    var MyBox = can.Control({
       pluginName : 'myBox'
    }, {});

    var MyClock = can.Control({
       pluginName : 'myClock'
    }, {});

	//- Inits the widgets
	$('.widgets:eq(0)').myBox();
	$('.widgets:eq(1)').myClock();
	 
	$('.widgets').controls() //-> [ MyBox, MyClock ]
	$('.widgets').controls('myBox') // -> [MyBox]
	$('.widgets').controls(MyClock) // -> MyClock

#### `jQuery.fn.control([type])`

- Param: `{String|can.Control}` control - The type of Control to find
- Return `{can.Control}` - The first control found

This is the same as `$().controls` except that it only returns the first Control found.

	//- Init MyBox widget
	$('.widgets').my_box();
    
	<div class="widgets my_box" />
    
	$('.widgets').controls() //-> MyBox

#### `update(newOptions)`

- Param: `{Object}` newOptions - Options to merge into the current options.

Update extends [options](https://canjs.com/docs/can.Control.prototype.options.html) with the `options` argument and rebinds all events.  It re-configures the control.

For example, the following control wraps a recipe form. When the form
is submitted, it creates the recipe on the server.  When the recipe
is `created`, it resets the form with a new instance.

	 var Creator = can.Control({
		 "{recipe} created" : function(){
		 	this.update({recipe : new Recipe()});
		 	this.element[0].reset();
		 	this.element.find("[type=submit]").val("Create Recipe")
		 },
		 "submit" : function(el, ev){
		 	ev.preventDefault();
		 	var recipe = this.options.recipe;
		 	recipe.attrs( this.element.formParams() );
		 	this.element.find("[type=submit]").val("Saving...")
		 	recipe.save();
		 }
	});
	 
	$('#createRecipes').creator({ recipe : new Recipe() })


*Update* is called if a control's plugin helper is called with the plugin options on an element that already has a control instance of the same type. If you want to implement your own update method make sure to call the old one by calling `can.Control.prototype.update.apply(this, arguments);`. For example, you can change the content of the control element every time the options change:

	 var Plugin = can.Control({
	 	pluginName: 'myPlugin'
	 }, {
	 	init : function(el, options) {
	 	this.updateCount = 0;
	 	this.update({
	 		text : 'Initialized'
	 	});
	 },
	 update : function(options) {
	 	// Call the can.Control update first.
	 	// Use this._super when using can/construct/super
	 	can.Control.prototype.update.call(this, options);
	 	this.element.html(this.options.text + ' ' +
	 		(++this.updateCount) + ' times');
	 	}
	 });
	 
	 $('#control').myPlugin();
	 $('#control').html();
	 // Initialized. Updated 1 times
	 
	 $('#control').myPlugin({ text : 'Calling update. Updated' });
	 $('#control').html();
	 // Calling update. Updated 2 times

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
