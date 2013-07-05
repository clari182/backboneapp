define([
  'backbone'
], function(Backbone) {

  var BaseModel = Backbone.Model.extend({

    /**
      * Configure defaul id name
      */
    idAttribute: '_id',

    /**
      * Overload native function
      * for version control header
      */
    destroy: function (options) {

      options = options || {};
      options['headers'] = {'IF-Match': this.get('__v')};
      Backbone.Model.prototype.destroy.call(this, options);
    }
  });

  return BaseModel;
});
