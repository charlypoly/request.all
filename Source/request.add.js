/*
---
description: Augmnent Request Class with global methods.

license: MIT-style

authors:
- Charly POLY

requires:
- core 1.4.5
- more 1.4.0.1

provides: [Request.all]

...
*/
(function (name, context, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition()
  else if (typeof define == 'function' && define.amd) define(definition)
  else context[name] = definition()
})('request_watcher', this, function () {

  if (typeof MooTools === "undefined" || (MooTools.version < "1.4.5") || MooTools.More === "undefined" || MooTools.More.version < "1.4.0.1" || typeof Request === "undefined") {
		throw 'Mootools 1.4.5 with MooTools.More 1.4.0.1 is required';
		return;
	}

	var that = this,
	default_onComplete = null,
	callbacks = [],
	instances = [];

	function complete(r, obj, raw) {

		console.log('complete')

		dispatch.apply(this, arguments)
	}

	function failure(r, obj, raw) {
		//arguments.push('failure')

		console.log('failure')

		dispatch.apply(this, arguments)
	}


	function dispatch (/*json, raw*/) {
		_c = callbacks.clone();
		while(callback = _c.shift()) {
			var args = Array.prototype.slice.call(arguments);
			callback.apply(args.shift(), args);
		}

		if (this.__refactor_default_onComplete) {
			this.__refactor_default_onComplete.call(this.__refactor_default_onComplete);
		}

	}

	/*
     * Top level Request error Handler
     *	- Similar to $.ajaxError in JQuery
     */
    
    Class.refactor(Request, {
       
       preventDefault : function() {
       		//this.$events= {}; //clear the callback queue, the hard way
   			this.removeEvents('complete')
   			this.removeEvents('failure')
   			this.removeEvents('success')
       },

       initialize : function(options) {

    		instances.push(this)

			var opt_clone = Object.clone(options);
			if (typeof opt_clone.onComplete != 'undefined') {
			   that.default_onComplete = opt_clone.onComplete;
			}

			options['onComplete'] = function() {
				var args = Array.prototype.slice.call(arguments);
				args.unshift(this);
				Request._complete.apply(Request._complete, args)
			}.bind(this);

			// for 40* HTTP errors custom handler at top level !
			options['onFailure'] = function() {
				var args = Array.prototype.slice.call(arguments);
				args.unshift(this);
				Request._failure.apply(Request._failure, args)
			}.bind(this);

			this.previous(options);
       }
    });


	function add (callback) {
		callbacks.push(callback);
	}

	function filter (filter, callback) {
		
	}

	Request.All = add;

	Request.All.filter = filter;

	Request._complete = complete;
	Request._failure = failure;

});