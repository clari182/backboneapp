define([
	'app/app',
	'app/common/eventHandler',
	'app/modules/users/routers/users',
	'app/modules/users/controllers/users',
	'app/modules/users/collections/users',
	'app/modules/users/views/layout',
    'app/modules/users/views/collection',
    'app/modules/pagination/views/pagination',
	'app/modules/users/views/form',
	'app/modules/users/views/detail'
], function (app, eventHandler, UsersRouter, usersController, UsersCollection, UsersCollectionLayout, UsersCollectionView, PaginationView, UsersFormView, UsersDetailView) {

	var users = app.module('Users', function (Users, app) {

		var usersCollection = new UsersCollection([]), 

			prevFilterParams = {},

			validate = function (id) {
	      
				var model = new usersCollection.model({_id: id}),
					dfd = jQuery.Deferred();

				//
				app.vent.trigger('app:showSpinner');

				//
				$.when(model.fetch())
					.done(function (response) {

						//
						dfd.resolve(model);
					})
					.fail(function () {

						dfd.reject(model);

						// Mostramos el listado
						router.navigate('users', {trigger: true});
					})
					.always(function () {

						//
						app.vent.trigger('app:hideSpinner');
					});

				return dfd.promise();
			}, 

			router =  new UsersRouter({controller: usersController});


		// Collection events
		usersCollection.on('request', function(){
			app.vent.trigger('app:showSpinner');
		});
		usersCollection.on('sync', function(){
			app.vent.trigger('app:hideSpinner');
		});


		//
		router.on('route:showCollectionView', function () {

			var paginationView = new PaginationView({collection: usersCollection}),
				collectionView = new UsersCollectionView({collection: usersCollection}),
				layout = new UsersCollectionLayout();

			//
			paginationView.on('changePage', function (page) {

				layout.filter(page);
			});

			//
			collectionView.on('itemview:confirmRemove', function (view) {

				// Solicitamos confirmacion
				eventHandler.trigger('app:showConfirm', {
					message: 'Estas seguro de eliminar el usuario "' + view.model.get('name') + ' ' + view.model.get('lastname') + '"?',
					accept: function () {

						// Destruimos el modelo
						view.model.destroy({
							success: function () {

								// Mostramos el exito
								eventHandler.trigger('app:showSuccess', {
									message: 'El usuario fue eliminada con exito!'
								});

								//
								layout.trigger('filter', prevFilterParams);
							},
							error: function () {

								// Mostramos el error @TODO obtener el error
								eventHandler.trigger('app:showError', {
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
							{view: usersRelsLayout, title: 'Usuarios'}
						]
					});

				app.vent.trigger('app:showModal', modalLayout);
			}, this);

			//
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
			app.vent.trigger('app:showView', layout, Users.menuConf);
		});
		
		//
		router.on('route:showFormView', function (id) {

			var success = function (model) {

				var view = new UsersFormView({
					model: model
				});

				//
				view.on('save', function (model, attrs) {

					var self = this,
						add = !model.get('_id');

					// Guardamos
					model.save(attrs)
						.done(function () {

							// Avisamos
							eventHandler.trigger('app:showSuccess', {
								message: 'El usuario fue ' + (add? 'cargado' : 'actualizado') + ' con exito!',
								close: function () {

									router.navigate('users', {trigger: true});
								}
							});
						})
						.fail(function (res) {

							var msg = 'Ha ocurrido un error.<br />Por favor, recarge pa pagina.';

							//@TODO Ver de centralizar este analisis
							if (res.status === 409) {
								msg = 'El registro ya ha sido actualizada por otro usuario.<br />Actualice la p&aacute;gina para ver los nuevos datos.';
							}

							// 
							eventHandler.trigger('app:showError', {message: msg});
						});
				});
				view.on('showError', function (msg) {

					eventHandler.trigger('app:showError', msg);
				});

				//
				app.vent.trigger('app:showView', view, Users.menuConf);
			};

			// Si pasamos un id
			if (!!id) {

				// Validamos que exista
				validate(id)
					.done(success);
			}
			else {

				success(new usersCollection.model);
			}
		});
		
		//
		router.on('route:showDetailView', function (id) {

			// Validamos que exista
			validate(id)
				.done(function (model) {
				
					// Instanciamos
					var view = new UsersDetailView({model: model});

					app.vent.trigger('app:showView', view, Users.menuConf);
			});
		});
	});

	//
	users.menuConf = {
		label: 'Usuarios',
		routePath: '#users'
	};

	return users;
});