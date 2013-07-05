define([
  'bbloader',
  'modals',
  'app/common/eventHandler'
], function (Backbone, Modals, eventHandler) {


  var app = new Backbone.Marionette.Application();

  /**
    * Regions
    */
  app.addRegions({
    top: '.top',
    menu: '.menu',
    main: '.main',
    modals: '.modals'
  });


  /**
    * Regions events
    */
  app.vent.on('app:showView', function (view, module) {

    if (module){
      eventHandler.trigger('menu:highligthItemMenu', module);
    }

    this.main.show(view);
  }, app);
  app.vent.on('app:showTop', function (view) {

    this.top.show(view);
  }, app);
  app.vent.on('app:showMenu', function (view) {

    app.menu.show(view);
  });
  app.vent.on('app:showModal', function (view) {

    app.modals.show(view);
    view.$el.modal('show');
    view.setActiveTab(0);
  });
  app.vent.on('app:showSpinner', function () {

    Modals.loading({show: true});
  });
  app.vent.on('app:hideSpinner', function () {

    Modals.loading({show: false});
  });


  /**
    * Modals events
    */
  app.vent.on('app:showError', function (config) {

    Modals.error(config);
  });
  app.vent.on('app:showSuccess', function (config) {

    Modals.success(config);
  });
  app.vent.on('app:showConfirm', function (config) {

    Modals.confirm(config);
  });


  /**
    * App events
    */
  app.on('start', function () {

      Backbone.history.start();
  });

  return app;
});
