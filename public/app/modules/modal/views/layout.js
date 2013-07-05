define([
    'underscore',
    'bbloader',
    'app/common/eventHandler',
    'text!app/modules/modal/views/templates/layout.html'
], function (_, Backbone, eventHandler, modalLayoutHTML) {
<<<<<<< HEAD

    //
    var ModalLayout = Backbone.Marionette.Layout.extend({
=======
  
  //
  var ModalLayout = Backbone.Marionette.Layout.extend({
>>>>>>> origin/master

    tagName: 'div',

    className: 'modal hide',

    template: modalLayoutHTML,

    events: {
      'click button.close': 'closeModal'
    },

    regions: {
      titles: '.tab-titles'
    },

<<<<<<< HEAD
        closeModal: function () {

          this.trigger('closeModal', this);
        },

        setTitle: function (title) {

            this.$el.find('.title').html(title);
        },

        setActiveTab: function (pos) {

            this.$el.find('a[data-target="#modalTab' + pos + '"]').tab('show');
        }
    });
=======
    closeModal: function () {
      
      // Fire event for listener (Module)
      this.trigger('closeModal', this);
    },

    setTitle: function (title) {
        
      this.$el.find('.title').html(title);
    },

    setActiveTab: function (pos) {
        
      this.$el.find('a[data-target="#modalTab' + pos + '"]').tab('show');
    }
  });
>>>>>>> origin/master

  return ModalLayout;
});
