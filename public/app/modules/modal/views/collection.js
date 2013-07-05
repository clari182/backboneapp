define([
	'jquery',
	'bbloader',
	'app/modules/modal/views/item'
], function ($, Backbone, ModalItemView) {
<<<<<<< HEAD

    var ModalCollectionView = Backbone.Marionette.CollectionView.extend({
=======
  
	var ModalCollectionView = Backbone.Marionette.CollectionView.extend({
>>>>>>> origin/master

		tagName: 'ul',

		className: 'nav nav-tabs',

		itemView: ModalItemView
	});

	return ModalCollectionView;
});