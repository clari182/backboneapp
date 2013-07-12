define([
	'bbloader',
	'modules/modal/viewItem'
], function (Backbone, ItemView) {

	var CollectionView = Backbone.Marionette.CollectionView.extend({

		tagName: 'ul',

		className: 'nav nav-tabs',

		itemView: ItemView
	});

	return CollectionView;
});