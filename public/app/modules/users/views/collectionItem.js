define([
  'bbloader',
  'text!app/modules/users/views/templates/collectionItem.html'
], function (Backbone, usersCollectionItemHTML) {

  //
  var UsersCollectionItemView = Backbone.Marionette.ItemView.extend({

    tagName: 'tr',

    template: usersCollectionItemHTML,

    events: {
      'click button.remove': 'confirmRemove',
      'click button.info': 'showInfo'
    },

    confirmRemove: function() {

      // Fire event for the listener (Module)
      this.trigger('confirmRemove', this);
    },

    showInfo: function() {

      // Fire event for the listener (Module)
      this.trigger('showInfo', this);
    }
  });

  return UsersCollectionItemView;
});
