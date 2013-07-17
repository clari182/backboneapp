define([
  'backbone',
  'text!templates/top.html'
], function (Backbone, html) {

	var TopView = Backbone.View.extend({
		template: html
	});

	return TopView;
});
