'use strict';

/* jshint -W079 */
/* global My */
require('./can-control-plugin');
require('steal-qunit');

QUnit.module('can/control/plugin');

QUnit.test('pluginName', function(assert) {
	assert.expect(8);
	can.Control('My.TestPlugin', {
		pluginName: 'my_plugin'
	}, {
		init: function(el, ops) {
			assert.ok(true, 'Init called');
			assert.equal(ops.testop, 'testing', 'Test argument set');
		},
		method: function(arg) {
			assert.ok(true, 'Method called');
			assert.equal(arg, 'testarg', 'Test argument passed');
		},
		update: function() {
			assert.ok(true, 'Update called');
		}
	});
	var ta = can.$('<div/>')
		.addClass('existing_class')
		.appendTo($('#qunit-fixture'));
	ta.my_plugin({
		testop: 'testing'
	});
	// Init
	assert.ok(ta.hasClass('my_plugin'), 'Should have class my_plugin');
	ta.my_plugin();
	// Update
	ta.my_plugin('method', 'testarg');
	// method()
	ta.control()
		.destroy();
	// destroy
	assert.ok(!ta.hasClass('my_plugin'), 'Shouldn\'t have class my_plugin after being destroyed');
	assert.ok(ta.hasClass('existing_class'), 'Existing class should still be there');
});
QUnit.test('.control(), .controls() and _fullname', function(assert) {
	assert.expect(3);
	can.Control('My.TestPlugin', {});
	var ta = can.$('<div/>')
		.appendTo($('#qunit-fixture'));
	assert.ok(ta.my_test_plugin, 'Converting Control name to plugin name worked');
	ta.my_test_plugin();
	assert.equal(ta.controls()
		.length, 1, '.controls() returns one instance');
	assert.ok(ta.control() instanceof My.TestPlugin, 'Control is instance of test plugin');
});
QUnit.test('update', function(assert) {
	can.Control({
		pluginName: 'updateTest'
	}, {});
	var ta = can.$('<div/>')
		.addClass('existing_class')
		.appendTo($('#qunit-fixture'));
	ta.updateTest();
	// Init
	ta.updateTest({
		testop: 'testing'
	});
	assert.equal(ta.control()
		.options.testop, 'testing', 'Test option has been extended properly');
});
QUnit.test('calling methods', function(assert) {
	can.Control({
		pluginName: 'callTest'
	}, {
		returnTest: function() {
			return 'Hi ' + this.name;
		},
		setName: function(name) {
			this.name = name;
		}
	});
	var ta = can.$('<div/>')
		.appendTo($('#qunit-fixture'));
	ta.callTest();
	assert.ok(ta.callTest('setName', 'Tester') instanceof $, 'Got jQuery element as return value');
	assert.equal(ta.callTest('returnTest'), 'Hi Tester', 'Got correct return value');
});
QUnit.test('always use pluginName first in .control(name) (#448)', 4, function(assert) {
	can.Control('SomeName', {
		pluginName: 'someTest'
	}, {});
	can.Control({
		pluginName: 'otherTest'
	}, {});
	var ta = can.$('<div/>')
		.appendTo($('#qunit-fixture'));
	ta.someTest();
	ta.otherTest();
	var control = ta.control('someTest');
	assert.ok(control, 'Got a control from pluginName');
	assert.equal(control.constructor.pluginName, 'someTest', 'Got correct control');
	control = ta.control('otherTest');
	assert.ok(control, 'Got a control from pluginName');
	assert.equal(control.constructor.pluginName, 'otherTest', 'Got correct control');
});
