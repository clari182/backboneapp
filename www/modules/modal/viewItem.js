define([
  'bbloader',
  'text!modules/modal/tplItem.html'
], function (Backbone, html) {

  var ModalItemView = Backbone.Marionette.ItemView.extend({

    tagName: 'li',

    template: html
  });

  return ModalItemView;
});
