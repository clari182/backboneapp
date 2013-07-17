define([
  'app',
  'views/movies/layout',
  'views/movies/collection',
  'views/movies/item',
  'views/movies/detail',
  'views/movies/form',
  'views/pagination',
  'collections/movies',
  'models/movie'
], function (App, Backbone, MoviesLayoutView, MoviesCollectionView, MoviesItemView, MoviesDetailView, MoviesFormView, PaginationView, MoviesCollection, MoviesModel, URController, ModalController) {

	var MoviesComp = {
		getCollection: function () {

			return new MoviesCollection({model: MoviesModel});
		},

		getListView: function () {

			var prevFilterParams = {},
				collection = this.getCollection(),
				layoutView = new MoviesLayoutView(),
				collectionView = MoviesCollectionView({
					collection: collection,
					itemView: MoviesItemView
				}),
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

				var URComp = App.reqres.request('URComp'),
					ModalComp = App.reqres.request('ModalComp'),

					detailView = this.getDetailView(model),

					usersRelsLayout = App.reqres.request('URComp').getLayout({
						idReg: model.get(model.idAttribute),
						typeReg: 'movie'
					}),

					modalLayout = ModalComp.getLayout({
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

				App.vent.trigger('app:showSpinner', true);

				collection.remove(collection.models);
				collection.fetch({data: params})
					.always(function () {

						App.vent.trigger('app:showSpinner', false);
					});
			});

			layoutView.on('render', function () {

				this.pagination.show(paginationView);
				this.table.show(collectionView);
				this.filter(1);
			});

			return layoutView;
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

								App.vent.trigger('app:navigate', 'movies');
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

		getDetailView: function (model) {

			var view = new MoviesDetailView({
				model: model
			});

			return view;
		}
	};

	return MoviesComp;
});
