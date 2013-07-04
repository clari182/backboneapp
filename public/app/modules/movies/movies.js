define([
	'app/app',
	'app/modules/movies/routers/movies',
	'app/modules/movies/controllers/movies',
	'app/modules/movies/collections/movies',
	'app/modules/movies/views/layout',
	'app/modules/movies/views/collection',
	'app/modules/pagination/views/pagination',
	'app/modules/movies/views/form',
	'app/modules/movies/views/detail'
], function (app, MoviesRouter, moviesController, MoviesCollection, MoviesCollectionLayout, MoviesCollectionView, PaginationView, MoviesFormView, MoviesDetailView) {

	var movies = app.module('Movies', function (Movies, app) {

		/**
			* Collection init, Router init and private methods and vars
			*/
		var moviesCollection = new MoviesCollection([]), 

			prevFilterParams = {},

			validate = function (id) {
	      
				var model = new moviesCollection.model({_id: id}),
					dfd = jQuery.Deferred();

				// Show loader
				app.vent.trigger('app:showSpinner');

				// Search for record info
				$.when(model.fetch())
					.done(function (response) {

						//
						dfd.resolve(model);
					})
					.fail(function () {

						dfd.reject(model);

						// Navigate to CollectionView
						router.navigate('movies', {trigger: true});
					})
					.always(function () {

						// Hide loader
						app.vent.trigger('app:hideSpinner');
					});

				return dfd.promise();
			}, 

			router =  new MoviesRouter({controller: moviesController});


		/**
			* Listen events on Collection
			*/
		moviesCollection.on('request', function () {
			app.vent.trigger('app:showSpinner');
		});
		moviesCollection.on('sync', function () {
			app.vent.trigger('app:hideSpinner');
		});


		/**
			* Listen events on Router
			*/
		router.on('route:showCollectionView', function () {

			var paginationView = new PaginationView({collection: moviesCollection}),
				collectionView = new MoviesCollectionView({collection: moviesCollection}),
				layout = new MoviesCollectionLayout();


			/**
				* Listen events on PaginationView
				*/
			paginationView.on('changePage', function (page) {

				layout.filter(page);
			});


			/**
				* Listen events on CollectionView
				*/
			collectionView.on('itemview:confirmRemove', function (view) {

				// Ask user confirmation
				app.vent.trigger('app:showConfirm', {
					message: 'Estas seguro de eliminar la pelicula "' + view.model.get('title') + '"?',
					accept: function () {

						// Destroy model
						view.model.destroy({
							success: function () {

								// Show success
								app.vent.trigger('app:showSuccess', {
									message: 'La pelicula fue eliminada con exito!'
								});
							},
							error: function () {

								// @TODO get error from response

								// Show error
								app.vent.trigger('app:showError', {
									message: ''
								});
							}
						});
					}
				});
			});
			
			collectionView.on('itemview:showInfo', function (view) {

				var detailView = new MoviesDetailView({model: view.model}),

					usersRelsLayout = app.UsersRels.getLayout({
						idReg: view.model.get('_id'),
						typeReg: 'movie'
					}),

					modalLayout = app.ModalModule.getLayout({
						title: view.model.get('title'),
						tabs: [
							{view: detailView, title: 'Detalle'},
							{view: usersRelsLayout, title: 'Usuarios'}
						]
					});

				app.vent.trigger('app:showModal', modalLayout);
			}, this);


			/**
				* Listen events on Layout
				*/
			layout.on('filter', function (params) {

				if (!params) {
					params = prevFilterParams;
				}
				else {
					prevFilterParams = params;
				}

				moviesCollection.remove(moviesCollection.models);
				moviesCollection.fetch({data: params});
			});

			layout.on('render', function () {
				this.pagination.show(paginationView);
				this.table.show(collectionView);
				this.filter(1);
			});


			/**
				* Show this view
				*/
			app.vent.trigger('app:showView', layout, Movies.menuConf);
		});
		
		//
		router.on('route:showFormView', function (id) {

			var success = function (model) {

				var view = new MoviesFormView({
					model: model
				});


				/**
				* Listen events on FormView
				*/
				view.on('save', function (model, attrs) {

					var self = this,
						add = !model.get('_id');

					// Save model
					model.save(attrs)
						.done(function () {

							// Show success
							app.vent.trigger('app:showSuccess', {
								message: 'La pelicula fue ' + (add? 'cargada' : 'actualizada') + ' con exito!',
								close: function () {

									router.navigate('movies', {trigger: true});
								}
							});
						})
						.fail(function (res) {

							var msg = 'Ha ocurrido un error.<br />Por favor, recarge pa pagina.';

							//@TODO Centralize status control
							if (res.status === 409) {
								msg = 'El registro ya ha sido actualizada por otro usuario.<br />Actualice la p&aacute;gina para ver los nuevos datos.';
							}

							// Show error
							app.vent.trigger('app:showError', {message: msg});
						});
				});

				view.on('showError', function (msg) {

					app.vent.trigger('app:showError', msg);
				});


				/**
					* Show this view
					*/
				app.vent.trigger('app:showView', view, Movies.menuConf);
			};

			// If id is passed
			if (!!id) {

				// Validate record exists
				validate(id)
					.done(success);
			}
			else {

				// Show form
				success(new moviesCollection.model);
			}
		});
	});


	/**
		* Set module menu config
		*/
	movies.menuConf = {
		label: 'Peliclas',
		routePath: '#movies'
	};

	return movies;
});
