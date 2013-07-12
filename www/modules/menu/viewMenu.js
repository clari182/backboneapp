define([
	'bbloader',
	'text!modules/menu/tplMenu.html',
	'modules/menu/viewButton',
	'modules/menu/modelButton'
], function (Backbone, html, ButtonView, ButtonModel) {

	var MenuView = Backbone.Marionette.ItemView.extend({
		template: html,

		createButton: function (conf) {

			var button = new ButtonView({model: new ButtonModel(conf)});
			this.$el.find('.nav').append(button.render().el);
		},

		updateHighligthedItem: function (data) {

			var itemSelector = '.nav a[href="' + data.routePath + '"]';
			this.$el.find('.nav li').removeClass('active');
			this.$el.find(itemSelector).closest('li').addClass('active');
		}
	});

	return MenuView;
});
