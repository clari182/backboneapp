define([
  'app/app',
  'app/modules/top/views/top'
], function (app, TopView) {

	var top = app.module('Top', function (Top, app) {

		// On app start, set top
		app.on('start', function () {

			// Show top
			this.vent.trigger('app:showTop', new TopView);
		});
	});

	return top;
});