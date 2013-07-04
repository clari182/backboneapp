define([
    'underscore',
    'bbloader',
    'text!app/modules/users/views/templates/layout.html'
], function (_, Backbone, usersLayoutHTML) {
  
  //
  var UsersCollectionLayout = Backbone.Marionette.Layout.extend({

    tagName: 'div',

    className: 'span12',

    template: usersLayoutHTML,

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
        name: this.$el.find('.search').val()
      };

      if (!isNaN(page) && page > 0) {

        params.page = page;
      }

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

    return UsersCollectionLayout;
});