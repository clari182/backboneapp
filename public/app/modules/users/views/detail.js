define([
  'bbloader',
  'text!app/modules/users/views/templates/detail.html'
], function (Backbone, usersDetailHTML) {
  
  //
  var UsersDetailView = Backbone.Marionette.ItemView.extend({

    tagName: 'div',
    
    template: usersDetailHTML
  });

  return UsersDetailView;
});