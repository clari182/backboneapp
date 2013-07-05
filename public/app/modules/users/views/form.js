define([
  'jquery',
  'bbloader',
  'text!app/modules/users/views/templates/form.html'
], function($, Backbone, usersFormHTML) {

  //
  var UsersFormView = Backbone.Marionette.ItemView.extend({

    tagName: 'div',

    className: 'span12',

    template: usersFormHTML,

    //
    events: {
      'submit .form': 'save'
    },

    save: function (evt) {

      var attrs = {};

      // Search for inputs values
      $(evt.target).find(':input').not('button').each(function () {

        var el = $(this);
        attrs[el.attr('name')] = el.val();
      });

      // Fire event for the listener (Module)
      this.trigger('save', this.model, attrs);

      //
      evt.preventDefault();
      return false; // Prevent page reload
    }
  });

  return UsersFormView;
});
