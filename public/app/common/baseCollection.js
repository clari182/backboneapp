define([
  'backbone'
], function(Backbone) {

  var BaseCollection = Backbone.Collection.extend({
    totalItems : 0,
    pageNumber : 1,
    pageSize : 10,
    /*parse: function (resp, options) {
      
      this.totalItems = resp.total;
      return resp.rows;
    },*/
    fetch: function (options) {

      options = options || {};

      //
      if (!options.data) {

        options.data = {
          page: this.pageNumber,
          size: this.pageSize
        };
      }
      else {

        // Page
        if (!!options.data.page) {

          this.pageNumber = options.data.page;
        }
        else {
          options.data.page = this.pageNumber;
        }

        // Size
        if (!!options.data.size) {

          this.pageSize = options.data.size;
        }
        else {
          options.data.size = this.pageSize;
        }
      }

      //
      Backbone.Collection.prototype.fetch.call(this, options);
    }
  });

  return BaseCollection;
});