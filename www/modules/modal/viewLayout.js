define([
    'bbloader',
    'text!modules/modal/tplLayout.html'
], function (Backbone, html) {


  //
  var ModalLayout = Backbone.Marionette.Layout.extend({

    tagName: 'div',

    className: 'modal hide',

    template: html,

    events: {
      'click button.close': 'closeModal'
    },

    regions: {
      titles: '.tab-titles'
    },

    closeModal: function () {

      // Fire event for listener (Module)
      this.trigger('closeModal', this);
      this.close();
    },

    setTitle: function (title) {

      this.$el.find('.title').html(title);
    },

    setActiveTab: function (pos) {

      this.$el.find('a[data-target="#modalTab' + pos + '"]').tab('show');
    },

    onShow: function () {

      this.$el.modal('show');
      this.setActiveTab(0);
    },

    onClose: function () {

      this.$el.modal('hide');
    }
  });

  return ModalLayout;
});
