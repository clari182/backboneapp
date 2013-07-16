define([
  'backbone'
], function (Backbone) {

  var MenuButtonModel = Backbone.Model.extend({
    defaults : {
      label : '',
      routePath: ''
    }
  });

  return MenuButtonModel;
});
