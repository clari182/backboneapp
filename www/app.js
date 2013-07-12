define([
  'bbloader',
  'modals',
  'modules/top/controller',
  'modules/menu/controller',
  'modules/movies/controller'
  //'modules/users/module'
], function (Backbone, Modals, TopController, MenuController, MoviesController, Router) {


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
  App.vent.on('app:showView', function (view, module) {

    if (module) {

      MenuController.setSelectedButton(module);
    }

    App.main.show(view);
  });

  App.vent.on('app:showModal', function (view) {

    App.modals.show(view);
  });
  App.vent.on('app:showLoader', function (show) {

    Modals.loading({show: show});
  });


  /**
    * Regions events
    */
  App.onInitializer(function () {

    App.top.show(TopController.getLayout());

    App.menu.show(MenuController.getLayout());
    MenuController.addButton(MoviesController.menuConf);

    var router = new Router({controller: MoviesController});
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
