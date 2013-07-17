define([
  'bbloader',
  'text!templates/movies/detail.html'
], function (Backbone, html) {

  //
  var DetailView = Backbone.Marionette.ItemView.extend({

    tagName: 'div',

    template: html
  });

  return DetailView;
});
