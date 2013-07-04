require.config({
	paths: {
		jquery: 'libs/jquery-1.9.1',
		underscore: 'libs/underscore',
		backbone: 'libs/backbone',
		bbloader: 'libs/backbone.loader',
		text: 'libs/text',
		bootstrap: 'libs/bootstrap',
		modals: 'libs/modals',
		'backbone.marionette': 'libs/backbone.marionette',
		'backbone.babysitter': 'libs/backbone.babysitter',
		'backbone.wreqr': 'libs/backbone.wreqr'
	}
});

require([
	'app/common/eventHandler',
	'app/app',
	'app/modules/top/top',
	'app/modules/movies/movies',
	'app/modules/users/users',
	'app/modules/menu/menu',
    'app/modules/usersRels/usersRels',
    'app/modules/modal/modal'
], function(eventHandler, app, top, movies, users, menu, usersRels) {

	//
	menu.on('start', function () {

		eventHandler.trigger('menu:createButton', movies.menuConf);
		eventHandler.trigger('menu:createButton', users.menuConf);
	});

	//
	app.start();
});