define([
  'bbloader',
  'text!templates/movies/collection.html'
], function (Backbone, html) {

  //
  var MoviesCollectionView = Backbone.Marionette.CompositeView.extend({

    tagName: 'table',

    className: 'table table-striped',

    template: html,

    itemViewContainer: 'tbody'
  });

  return MoviesCollectionView;
});
