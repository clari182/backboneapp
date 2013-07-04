define([
	'bbloader'
], function (Backbone) {

	var UsersRouter = Backbone.Marionette.AppRouter.extend({
		appRoutes: {
			'users': 'showCollectionView',
			'users/detail/:id': 'showDetailView',
			'users/new': 'showFormView',
			'users/edit/:id': 'showFormView'
		}
	});

	return UsersRouter;
});