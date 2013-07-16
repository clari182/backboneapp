define([
	'bbloader',
	'text!templates/menu.html'
], function (Backbone, html) {

	var MenuView = Backbone.Marionette.ItemView.extend({
		template: html,

		createButton: function (conf) {

			var button = new this.buttonView({model: new this.buttonModel(conf)});
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
