# Backbone.MiddlewareSync #

Allows you to add in extra processing to the Backbone.sync function.

For instance:

```javascript

var mySync = Sync();

mySync.addMiddleware(function(next, method, model, options) {
	console.log(method + ' on ' + model.toString() + ' with ' + options);
	next(method, model, options);
});

var LoggedCollection = Backbone.Collection.extend({
	sync: mySync
});

```

The first parameter for middleware will be the next function that should be called with the original arguments.

Also as a bonus there is an idea of Services which are a bundle of functions to run on success/error and extra options to be extended in services.js. Adding an array of complete/error/success functions will be transformed to a single function to run. You can convert a service to middleware using the provided function. Currently it requires [Underscore.Extras](https://github.com/rhysbrettbowen/Underscore.Extras)