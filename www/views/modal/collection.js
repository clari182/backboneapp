define([
	'bbloader'
], function (Backbone) {

	var CollectionView = Backbone.Marionette.CollectionView.extend({

		tagName: 'ul',

		className: 'nav nav-tabs'
	});

	return CollectionView;
});
