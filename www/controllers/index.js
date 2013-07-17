define([
	'app',
	'components/top/index',
	'components/menu/index',
	'components/usersRels/index',
	'controllers/movies'
], function (app, TopComp, MenuComp, URComp, MoviesRouter) {

  /**
    * Init
    */
  App.onInitializer(function () {

    App.vent.trigger('app:showTop', TopComp.getLayout());

    App.vent.trigger('app:showMenu', MenuComp.getLayout());
    MenuComp.addButton(MoviesRouter.getMenuConf());

    var movies = new MoviesRouter();
  });

  App.reqres.setHandler('URComp', function () {
    return URComp;
  });

  App.reqres.setHandler('ModalComp', function () {
    return ModalComp;
  });

});
