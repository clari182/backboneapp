define([
	'backbone',
	'collections/base'
], function(Backbone, BaseCollection) {

	var ModalCollection = BaseCollection.extend({
		model: Backbone.Model
	});

	return ModalCollection;
});
