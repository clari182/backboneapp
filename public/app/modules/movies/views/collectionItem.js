define([
  'bbloader',
  'text!app/modules/movies/views/templates/collectionItem.html'
], function (Backbone, moviesCollectionItemHTML) {
  
  //
  var MoviesCollectionItemView = Backbone.Marionette.ItemView.extend({
    
    tagName: 'tr',

    template: moviesCollectionItemHTML,
    
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

  return MoviesCollectionItemView;
});