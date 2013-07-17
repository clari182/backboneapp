define([
  'bbloader',
  'text!templates/modal/item.html'
], function (Backbone, html) {

  var ModalItemView = Backbone.Marionette.ItemView.extend({

    tagName: 'li',

    template: html
  });

  return ModalItemView;
});
