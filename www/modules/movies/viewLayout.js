define([
    'underscore',
    'bbloader',
    'text!modules/movies/tplLayout.html'
], function (_, Backbone, html) {

  //
  var LayoutView = Backbone.Marionette.Layout.extend({

    tagName: 'div',

    className: 'span12',

    template: html,

    regions: {
        pagination: '.pagination-container',
        table: '.collection-container',
        modal: '.modal-body'
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
        title: this.$el.find('.search').val()
      };

      if (!isNaN(page) && page > 0) {

        params.page = page;
      }

      // Fire event for listener (Module)
      this.trigger('filter', params);
    },

    //
    doSearch: function () {

      this.filter(1);
    },

    //
    matchEnter: function (evt) {

      if (evt.keyCode === 13) {

        this.doSearch();
      }
    }
  });

    return LayoutView;
});