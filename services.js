// v0.0.0

// ==========================================
// Copyright 2013 Dataminr
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================

define([
	'underscore.extras',
	'underscore'
], function() {

	var Services = {};

	Services.Service = {
		reqObj: {},
		add: function(obj) {
			this._reqObj = _.extend({}, reqObj, obj);
		},
		getRequest: function() {
			this._reqObj['complete'] = _.seq(this._reqObj['complete']);
			this._reqObj['error'] = _.seq(this._reqObj['error']);
			this._reqObj['success'] = _.seq(this._reqObj['success']);
			return this._reqObj;
		},
		always: function(fn) {
			_.push(this._reqObj, 'complete', fn);
		},
		fail: function(fn) {
			_.push(this._reqObj, 'error', fn);
		},
		done: function(fn) {
			_.push(this._reqObj, 'success', fn);
		},
	}

	Services.toMiddleware = function(service) {
		return function(orig, method, model, options) {
			service.add(options);
			orig(method, model, service.getRequest());
		};
	};

	return Services;

});