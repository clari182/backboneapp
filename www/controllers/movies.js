define([
	'backbone',
	'app',
	'components/movies/index'
], function (Backbone, App, MoviesComp) {

	var MoviesRouter = Backbone.Router.extend({
		routes: {
			'movies': 'showListView',
			'movies/detail/:id': 'showDetailView',
			'movies/new': 'showFormView',
			'movies/edit/:id': 'showFormView'
		},
		getMenuConf: function () {

			return {
				label: 'Peliclas',
				routePath: '#movies'
			};
		},

		getCollection: function () {

			return new Collection({model: Model});
		},

		showView: function (view) {

			App.vent.trigger('app:showView', view, this.getMenuConf());
		},

		showListView: function () {

			this.showView(MoviesComp.getListView());
		},

		validateIdExists: function (id, func) {

			// Show loader
			App.vent.trigger('app:showSpinner', true);

			// Validate record exists
			model.validateIdExists(id)
				.done(function () {

					MoviesRouter.showView(func(model));
				})
				.fail(function () {

					Backbone.Router.navigate('users', {trigger: true});
				})
				.always(function () {

					// Hide loader
					App.vent.trigger('app:showSpinner', false);
				});
		},

		showFormView: function (id) {

			var model = new Model();

			// If id is passed
			if (!!id) {

				this.validateIdExists(id, MoviesComp.getFormView);
			}
			else {

				this.showView(MoviesComp.getFormView(model));
			}
		},

		showDetailView: function (id) {

			this.validateIdExists(id, MoviesComp.getDetailView);
		}
	});

	return MoviesRouter;
});
