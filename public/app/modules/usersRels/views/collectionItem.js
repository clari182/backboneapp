define([
  'bbloader',
  'text!app/modules/usersRels/views/templates/collectionItem.html'
], function (Backbone, usersRelsCollectionItemHTML) {
  
  //
  var UsersRelsCollectionItemView = Backbone.Marionette.ItemView.extend({
    
    tagName: 'tr',

    template: usersRelsCollectionItemHTML,
    
    events: {
      'click button.remove': 'confirmRemove'
    },

    confirmRemove: function() {

      this.trigger('confirmRemove', this);
    },

    serializeData: function () {
      var data = {};

      if (this.model) {

        this.model.set('field', this.model.get(this.options.showField));
        data = this.model.toJSON();
      }
      else if (this.collection) {

        data = {
          items: this.collection.toJSON(),
          field: this.options.showField
        };
      }

      return data;
    }
  });

  return UsersRelsCollectionItemView;
});