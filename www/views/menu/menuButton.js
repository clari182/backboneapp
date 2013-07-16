define([
	'bbloader',
	'text!templates/menuButton.html'
], function (Backbone, html) {

	var MenuButtonView = Backbone.Marionette.ItemView.extend({
		template: html,
		tagName: 'li'
	});

	return MenuButtonView;
});
