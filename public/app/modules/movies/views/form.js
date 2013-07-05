define([
  'jquery',
  'bbloader',
  'text!app/modules/movies/views/templates/form.html'
], function($, Backbone, moviesFormHTML) {

  //
  var MoviesFormView = Backbone.Marionette.ItemView.extend({

    tagName: 'div',

    className: 'span12',

    template: moviesFormHTML,

    //
    events: {
      'submit .form': 'save',
      'change .poster': 'upload'
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
    },

    upload: function (evt) {
      var files = evt.target.files, // FileList object
        file = files[0],
        reader;

      // If its an image file
      if (!!file && file.type.match('image.*')) {

        // If it had a poster
        if (this.model.get('poster') !== '') {

          // Erase the poster
          this.model.set('poster', '');

          //
          this.$el.find('.poster-img').addClass('hide'); // Hide img
        }

        //
        this.$el.find('.poster').addClass('hide'); // Hide input
        this.$el.find('.poster-loader').removeClass('hide'); // Show loader

        // Create Reader
        reader = new FileReader();

        // Listen on load event
        reader.onload = $.proxy(function (e) {

          // Save poster info
          this.model.set('poster', e.target.result);

          // Set img tag src
          this.$el.find('.poster-img').attr('src', e.target.result);

          this.$el.find('.poster-loader').addClass('hide'); // Hide loader
          this.$el.find('.poster-img').removeClass('hide'); // Show img
          this.$el.find('.poster').removeClass('hide'); // Show input

        }, this);

        // Listen on error event
        reader.onerror = $.proxy(function () {

          this.$el.find('.poster-loader').addClass('hide'); // Hide loader
          this.$el.find('.poster').removeClass('hide'); // Show input

          //
          this.trigger('showError', {message: 'Ha ocurrido un error al intentar cargar el archivo'});
        }, this);

        // Start load
        reader.readAsDataURL(file);
      }
      else {

        // Show error
        this.trigger('showError', {message: 'El archivo ingresado no es una imagen'});
      }
    }
  });

  return MoviesFormView;
});
