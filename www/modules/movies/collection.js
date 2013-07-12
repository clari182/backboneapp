define([
	'common/baseCollection'
], function(BaseCollection) {

	var MoviesCollection = BaseCollection.extend({
		url: '/movies'
	});

	return MoviesCollection;
});
