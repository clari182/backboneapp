define([
  'bbloader',
  'text!modules/movies/tplItem.html'
], function (Backbone, html) {

  //
  var ItemView = Backbone.Marionette.ItemView.extend({

    tagName: 'tr',

    template: html,

    events: {
      'click button.remove': 'confirmRemove',
      'click button.info': 'showInfo'
    },

    confirmRemove: function() {

      // Fire event for listener (Module)
      this.trigger('confirmRemove', this);
    },

    showInfo: function() {

    // Fire event for listener (Module)
      this.trigger('showInfo', this);
    }
  });

  return ItemView;
});
