define([
    'bbloader',
    'text!templates/usersRels/layout.html'
], function (Backbone, html) {

  //
  var URLayout = Backbone.Marionette.Layout.extend({

    tagName: 'div',

    template: html,

    regions: {
        pagination: '.pagination-container',
        table: '.collection-container'
    },

    //
    events: {
      'click .doSearch': 'doSearch',
      'keypress .search': 'matchEnter'
    },

    //
    filter: function (page) {

      var params = {
        page: 1,
        key: this.$el.find('.search').val()
      };

      if (!isNaN(page) && page > 0) {

        params.page = page;
      }

      // Fire event to the listener (Module)
      this.trigger('filter', params);
    },

    //
    doSearch: function () {

      this.filter(1);
    },

    // Si 
    matchEnter: function (evt) {

      if (evt.keyCode === 13) {

        this.doSearch();
      }
    }
  });

  return URLayout;
});
