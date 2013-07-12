define([
	'jquery',
	'underscore',
	'modules/modal/viewsLayout',
	'modules/modal/viewsCollection',
	'modules/modal/collection'
], function ($, _, LayoutView, CollectionView, Collection) {


	var ModalController = {


		/**
			* Methos definition
			*/
		this.getLayout = function (config) {

			// Create Layout
			var layout = new LayoutView();

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
				this.titles.show(new CollectionView({
					collection: new Collection(config.tabs)
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

	return ModalController;
});
