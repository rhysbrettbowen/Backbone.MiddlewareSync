// v0.0.0

// ==========================================
// Copyright 2013 Dataminr
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================

define([
	'backbone'
], function() {

	var orig = Backbone.sync;

	var Sync = function() {
		var middle = [function(temp, method, model, options) {
			return orig(method, model, options);
		}];

		var sync = function(method, model, options) {
			var moddle = middle;
			if (model.syncMiddleware) {
				moddle = middle.concat(model.syncMiddleware);
			}
			var nextGen = function(num) {
				return function(method, model, options) {
					moddle[num](nextGen(num - 1), method, model, options);
				}
			};
			moddle[moddle.length - 1](nextGen(moddle.length - 2), method, model, options);
		};

		sync.addMiddleware = function(fn) {
			middle.push(fn);
		};

		sync.clone = function() {
			var tmp = Sync();
			for (var i = 1; i < middle.length; i++) {
				tmp.addMiddleware(middle[i]);
			}
			return tmp;
		};

		return sync;
	};

	return Sync;

});