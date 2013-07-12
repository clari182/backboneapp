define([
  'bbloader',
  'text!modules/usersRels/tplCollection.html',
  'modules/usersRels/viewUrItem'
], function (Backbone, html, URItemView) {

  //
  var URCollectionView = Backbone.Marionette.CompositeView.extend({

    tagName: 'table',

    className: 'table table-striped',

    template: html,

    itemView: URItemView,

    itemViewContainer: 'tbody',

    /**
      * Overwrite native function
      * to pass to the itemViews 
      * the field that needs to be showed
      */
    buildItemView: function (item, ItemViewType, itemViewOptions) {

      var options = _.extend({model: item}, itemViewOptions);
      options.showField = this.options.showField;
      return new ItemViewType(options);
    }
  });

  return URCollectionView;
});
