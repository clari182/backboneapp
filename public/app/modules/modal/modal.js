define([
	'jquery',
	'underscore',
	'app/app',
	'app/modules/modal/views/layout',
	'app/modules/modal/views/collection',
	'app/modules/modal/collections/modals'
], function ($, _, app, ModalLayout, ModalCollectionView, ModalCollection) {


	var modalModule = app.module('ModalModule', function () {


		/**
			* Methos definition
			*/
		this.getLayout = function (config) {

			// Create Layout
			var layout = new ModalLayout();

			// For each tab set index attr
			_.each(config.tabs, function (tab, index) {
				tab._index = index;
			});


			/**
				* Listen events on Layout
				*/
			layout.on('render', function () {

				// Set modal title
				this.setTitle(config.title);

				// Set tab titles
				this.titles.show(new ModalCollectionView({
					collection: new ModalCollection(config.tabs)
				}));

				// For each tab create tab bodys
				_.each(config.tabs, function (tab) {

					var tabName = 'modalTab' + tab._index,
					$title = $('<div/>', {
						html: tab.title,
						id: tabName,
						class: 'tab-pane'
					});
					this.$el.find('.tab-content').append($title);

					//
					this.addRegion(tabName, '#' + tabName);
					this[tabName].show(tab.view);
				}, this);
			});

			layout.on('closeModal', function () {

				this.close();
			});

			//
			return layout;
		};
	});

	return modalModule;
});
