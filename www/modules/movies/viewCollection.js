define([
  'bbloader',
  'text!modules/movies/tplCollection.html',
  'modules/movies/viewItem'
], function (Backbone, html, ItemView) {

  //
  var CollectionView = Backbone.Marionette.CompositeView.extend({

    tagName: 'table',

    className: 'table table-striped',

    template: html,

    itemView: ItemView,

    itemViewContainer: 'tbody'
  });

  return CollectionView;
});
