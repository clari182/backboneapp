define([
  'bbloader',
  'app/common/eventHandler',
  'text!app/modules/usersRels/views/templates/collection.html',
  'app/modules/usersRels/views/collectionItem'
], function (Backbone, eventHandler, usersRelsCollectionHTML, UsersRelsCollectionItemView) {
  
  //
  var UsersRelsCollectionView = Backbone.Marionette.CompositeView.extend({

    tagName: 'table',

    className: 'table table-striped',

    template: usersRelsCollectionHTML,

    itemView: UsersRelsCollectionItemView,

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

  return UsersRelsCollectionView;
});