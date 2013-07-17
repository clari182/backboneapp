define([
  'bbloader',
  'text!templates/usersRels/collection.html'
], function (Backbone, html) {

  //
  var URCollectionView = Backbone.Marionette.CompositeView.extend({

    tagName: 'table',

    className: 'table table-striped',

    template: html,

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
