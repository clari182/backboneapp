define([
  'bbloader',
  'text!modules/movies/tplDetail.html'
], function (Backbone, html) {

  //
  var DetailView = Backbone.Marionette.ItemView.extend({

    tagName: 'div',

    template: html
  });

  return DetailView;
});
