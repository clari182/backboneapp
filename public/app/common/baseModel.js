define([
  'backbone'
], function(Backbone) {

  var BaseModel = Backbone.Model.extend({

    /**
      * Configure defaul id name
      */
    idAttribute: '_id',
<<<<<<< HEAD

    destroy: function (options) {

      options = options || {};
      options['headers'] = {'IF-Match': this.get('_rev')};
=======
    
    /**
      * Overload native function
      * for version control header
      */
    destroy: function (options) {

      var options = options || {};
      options['headers'] = {'IF-Match': this.get('__v')};
>>>>>>> origin/master
      Backbone.Model.prototype.destroy.call(this, options);
    }
  });

  return BaseModel;
});
