define([
  'bbloader',
  'text!templates/movies/item.html'
], function (Backbone, html) {

  //
  var MoviesItemView = Backbone.Marionette.ItemView.extend({

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

  return MoviesItemView;
});
