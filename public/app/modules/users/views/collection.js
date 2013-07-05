define([
  'bbloader',
  'text!app/modules/users/views/templates/collection.html',
  'app/modules/users/views/collectionItem'
], function (Backbone, usersCollectionHTML, UsersCollectionItemView) {

  //
  var UsersCollectionView = Backbone.Marionette.CompositeView.extend({

    tagName: 'table',

    className: 'table table-striped',

    template: usersCollectionHTML,

    itemView: UsersCollectionItemView,

    itemViewContainer: 'tbody'
  });

  return UsersCollectionView;
});