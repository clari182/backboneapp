define([
  'bbloader',
  'modals',
  'controlller/index'
], function (Backbone, Modals, Index) {


  var App = new Backbone.Marionette.Application();


  /**
    * Regions
    */
  App.addRegions({
    top: '.top',
    menu: '.menu',
    main: '.main',
    modals: '.modals'
  });


  /**
    * Bus events
    */

  App.vent.on('app:showTop', function (view) {

    App.top.show(view);
  });

  App.vent.on('app:showMenu', function (view) {

    App.menu.show(view);
  });

  App.vent.on('app:showView', function (view, module) {

    if (module) {

      App.vent.trigger('menu:setSelected', module);
    }

    App.main.show(view);
  });

  App.vent.on('app:showModal', function (view) {

    App.modals.show(view);
  });

  App.vent.on('app:showSpinner', function (show) {

    Modals.loading({show: show});
  });

  App.vent.on('app:navigate', function (route) {

    Backbone.Router.navigate(route, {trigger: true});
  });


  /**
    * App events
    */
  App.on('initialize:after', function () {

    //
    Backbone.history.start();
  });

  return App;
});
