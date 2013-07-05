define([
	'app/app',
	'app/modules/users/routers/users',
	'app/modules/users/controllers/users',
	'app/modules/users/collections/users',
	'app/modules/users/views/layout',
	'app/modules/users/views/collection',
	'app/modules/pagination/views/pagination',
	'app/modules/users/views/form',
	'app/modules/users/views/detail'
], function (app, UsersRouter, usersController, UsersCollection, UsersCollectionLayout, UsersCollectionView, PaginationView, UsersFormView, UsersDetailView) {

	var users = app.module('Users', function (Users, app) {

		/**
			* Collection init, Router init and privated methos an vars
			*/
		var usersCollection = new UsersCollection([]),

			prevFilterParams = {},

			validate = function (id) {

				var model = new usersCollection.model({_id: id}),
					dfd = jQuery.Deferred();

				// Show loader
				app.vent.trigger('app:showSpinner');

				// Search record info
				$.when(model.fetch())
					.done(function (response) {

						//
						dfd.resolve(model);
					})
					.fail(function () {

						dfd.reject(model);

						// Navigate to CollectionView
						router.navigate('users', {trigger: true});
					})
					.always(function () {

						// Hide loader
						app.vent.trigger('app:hideSpinner');
					});

				return dfd.promise();
			},

			router =  new UsersRouter({controller: usersController});


		/**
			* Listen for collection events
			*/
		usersCollection.on('request', function(){
			app.vent.trigger('app:showSpinner');
		});
		usersCollection.on('sync', function(){
			app.vent.trigger('app:hideSpinner');
		});


		/**
			* Listen for router events
			*/
		router.on('route:showCollectionView', function () {

			var paginationView = new PaginationView({collection: usersCollection}),
				collectionView = new UsersCollectionView({collection: usersCollection}),
				layout = new UsersCollectionLayout();


			/**
				* Listen events on  PaginationView
				*/
			paginationView.on('changePage', function (page) {

				layout.filter(page);
			});


			/**
				* Listen events on collectionView
				*/
			collectionView.on('itemview:confirmRemove', function (view) {

				// Request user confirmation
				app.vent.trigger('app:showConfirm', {
					message: 'Estas seguro de eliminar el usuario "' + view.model.get('name') + ' ' + view.model.get('lastname') + '"?',
					accept: function () {

						// Destroy model
						view.model.destroy({
							success: function () {

								// Show success
								app.vent.trigger('app:showSuccess', {
									message: 'El usuario fue eliminada con exito!'
								});

								// Update CollectionView
								layout.trigger('filter', prevFilterParams);
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

				var detailView = new UsersDetailView({model: view.model}),

					usersRelsLayout = app.UsersRels.getLayout({
						idUser: view.model.get('_id'),
						typeReg: 'movie'
					}),

					modalLayout = app.ModalModule.getLayout({
						title: view.model.get('name') + ' ' + view.model.get('lastname'),
						tabs: [
							{view: detailView, title: 'Detalle'},
							{view: usersRelsLayout, title: 'Peliculas'}
						]
					});


				/**
					* Show this view
					*/
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

				usersCollection.remove(usersCollection.models);
				usersCollection.fetch({data: params});
			});

			layout.on('render', function () {
				this.pagination.show(paginationView);
				this.table.show(collectionView);
				this.filter(1);
			});


			/**
				* Show this view
				*/
			app.vent.trigger('app:showView', layout, Users.menuConf);
		});


		//
		router.on('route:showFormView', function (id) {

			var success = function (model) {

				// Creat FormView
				var view = new UsersFormView({
					model: model
				});


				/**
					* Listen events for FormView
					*/
				view.on('save', function (model, attrs) {

					var self = this,
						add = !model.get('_id');

					// Save model
					model.save(attrs)
						.done(function () {

							// Show success
							app.vent.trigger('app:showSuccess', {
								message: 'El usuario fue ' + (add? 'cargado' : 'actualizado') + ' con exito!',
								close: function () {

									// Navigate to users CollectionView
									router.navigate('users', {trigger: true});
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
				app.vent.trigger('app:showView', view, Users.menuConf);
			};

			// If id was pass
			if (!!id) {

				// Validate record exists
				validate(id)
					.done(success);
			}
			else {

				// Show form
				success(new usersCollection.model());
			}
		});
	});


	/**
	* Set module menu config
	*/
	users.menuConf = {
		label: 'Usuarios',
		routePath: '#users'
	};

	return users;
});
