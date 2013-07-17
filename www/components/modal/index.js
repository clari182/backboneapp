define([
	'jquery',
	'underscore',
	'views/modal/layout',
	'views/modal/collection',
	'views/modal/item',
	'collections/modal'
], function ($, _, ModalLayoutView, ModalCollectionView, ModalItemView, ModalCollection) {


	var ModalComp = {
		getLayout: function (config) {

			// Create Layout
			var layout = new ModalLayoutView();

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
					itemView: ModalItemView,
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

			layout.on('closeModal', _.bind(function () {

				this.close();
			}), layout);

			//
			return layout;
		}
	};

	return ModalComp;
});
