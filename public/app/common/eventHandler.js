define([
  'bbloader'
], function (Backbone) {

	// Event bus
	return new Backbone.Wreqr.EventAggregator();
});