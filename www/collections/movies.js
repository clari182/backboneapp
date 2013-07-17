define([
	'collections/base'
], function(BaseCollection) {

	var MoviesCollection = BaseCollection.extend({
		url: '/movies'
	});

	return MoviesCollection;
});
