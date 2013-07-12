define([
	'bbloader',
	'text!modules/menu/tplButton.html'
], function (Backbone, html) {

	var ButtonView = Backbone.Marionette.ItemView.extend({
		template: html,
		tagName: 'li'
	});

	return ButtonView;
});
