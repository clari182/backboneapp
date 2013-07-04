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

      this.trigger('confirmRemove', this);
    },

    showInfo: function() {

      this.trigger('showInfo', this);
    }
  });

  return UsersCollectionItemView;
});