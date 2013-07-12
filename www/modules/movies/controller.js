define([
  'app',
  'modules/movies/viewLayout',
  'modules/movies/viewCollection',
  'modules/pagination/viewPagination',
  'modules/movies/collection',
  'modules/movies/model',
  'modules/usersRels/controller',
  'modules/modal/controller'
], function (App, LayoutView, CollectionView, PaginationView, Collection, Model, URController, ModalController) {

	var MoviesController = {
		getMenuConf: function () {

			return {
				label: 'Peliclas',
				routePath: '#movies'
			};
		},

		getCollection: function () {

			return new Collection({model: Model});
		},

		showView: function (view) {

			App.vent.trigger('app:showView', view, this.getMenuConf());
		},

		getListView: function () {

			var prevFilterParams = {},
				collection = this.getCollection(),
				layoutView = new LayoutView(),
				collectionView = CollectionView({collection: collection}),
				paginationView = PaginationView({collection: collection});


			/**
				* Listen events on PaginationView
				*/
			layoutView.listenTo(paginationView, 'changePage', function (page) {

				layoutView.filter(page);
			});


			/**
				* Listen events on CollectionView
				*/
			layoutView.listenTo(collectionView, 'itemview:confirmRemove', function (view, model) {

				// Ask user confirmation
				App.vent.trigger('app:showConfirm', {
					message: 'Estas seguro de eliminar la pelicula "' + model.get('title') + '"?',
					accept: function () {

						// Destroy model
						model.destroy({
							success: function () {

								// Show success
								App.vent.trigger('app:showSuccess', {
									message: 'La pelicula fue eliminada con exito!'
								});
							},
							error: function () {

								// @TODO get error from response

								// Show error
								App.vent.trigger('app:showError', {
									message: ''
								});
							}
						});
					}
				});
			});

			layoutView.listenTo(collectionView, 'itemview:showInfo', function (view, model) {

				var detailView = new ViewType({model: model}),

					usersRelsLayout = URController.getLayout({
						idReg: model.get('_id'),
						typeReg: 'movie'
					}),

					modalLayout = ModalController.getLayout({
						title: model.get('title'),
						tabs: [
							{view: detailView, title: 'Detalle'},
							{view: usersRelsLayout, title: 'Usuarios'}
						]
					});

				App.vent.trigger('app:showModal', modalLayout);
			}, this);


			/**
				* Listen events on Layout
				*/
			layoutView.on('filter', function (params) {

				if (!params) {
					params = prevFilterParams;
				}
				else {
					prevFilterParams = params;
				}

				App.vent.trigger('app:showLoader', true);

				collection.remove(collection.models);
				collection.fetch({data: params})
					.always(function () {

						App.vent.trigger('app:showLoader', false);
					});
			});

			layoutView.on('render', function () {

				this.pagination.show(paginationView);
				this.table.show(collectionView);
				this.filter(1);
			});

			return layoutView;
		},

		showListView: function () {

			this.showView(this.getListView());
		},

		getFormView: function (model) {

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
						App.vent.trigger('app:showSuccess', {
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
						App.vent.trigger('app:showError', {message: msg});
					});
			});

			view.on('showError', function (msg) {

				App.vent.trigger('app:showError', msg);
			});

			return view;
		},

		showFormView: function (id) {

			var model = new Model(),
				self = this;

			// If id is passed
			if (!id) {

				// Show loader
				App.vent.trigger('app:showLoader', true);

				// Validate record exists
				model.validateIdExists(id)
					.done(function () {

						self.showView(self.getFormView(model));
					})
					.always(function () {

						// Hide loader
						App.vent.trigger('app:showLoader', false);
					})
			}
			else {

				this.showView(this.getFormView(model));
			}
		}
	};

	return MoviesController;
});
