define([
	'app/common/baseCollection',
	'app/modules/movies/models/movie'
], function(BaseCollection, MovieModel) {

	var MoviesCollection = BaseCollection.extend({
		model: MovieModel,
		url: '/movies'
	});

	return MoviesCollection;
});
