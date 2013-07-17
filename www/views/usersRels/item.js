define([
  'bbloader',
  'text!templates/usersRels/item.html'
], function (Backbone, html) {

  //
  var URItemView = Backbone.Marionette.ItemView.extend({

    tagName: 'tr',

    template: html,

    events: {
      'click button.remove': 'confirmRemove'
    },

    confirmRemove: function() {

      this.trigger('confirmRemove', this.model);
    },

    /**
      * Overwrite native function
      * to set the field to be showed
      */
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

  return URItemView;
});
