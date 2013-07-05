define([
  'jquery',
  'bbloader',
  'text!app/modules/modal/views/templates/liItem.html'
], function ($, Backbone, liItemHTML) {
<<<<<<< HEAD

    var ModalItemView = Backbone.Marionette.ItemView.extend({
=======
  
  var ModalItemView = Backbone.Marionette.ItemView.extend({
>>>>>>> origin/master

    tagName: 'li',

    template: liItemHTML
  });

  return ModalItemView;
});
