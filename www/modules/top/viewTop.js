define([
  'backbone',
  'text!app/modules/top/tplTop.html'
], function (Backbone, html) {

	var TopView = Backbone.View.extend({
		template: html
	});

	return TopView;
});
