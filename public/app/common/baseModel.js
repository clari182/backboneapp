define([
  'backbone'
], function(Backbone) {

  var BaseModel = Backbone.Model.extend({

    idAttribute: '_id',
    
    destroy: function (options) {

      var options = options || {};
      options['headers'] = {'IF-Match': this.get('__v')};
      Backbone.Model.prototype.destroy.call(this, options);
    }
  });

  return BaseModel;
});
