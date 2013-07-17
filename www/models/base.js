define([
  'backbone',
  'jquery'
], function(Backbone, $) {

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
    },

    validateIdExists: function (id) {

      this.set(this.idAttribute, id);
      return this.fetch();
    }
  });

  return BaseModel;
});
