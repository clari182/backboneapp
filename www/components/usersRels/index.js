define([
  'app',
  'views/usersRels/layout',
  'views/usersRels/collection',
  'views/usersRels/item',
  'views/pagination',
  'collection/usersRels',
  'models/usersRels'
], function (App, URLayoutView, URCollectionView, URItemView, PaginationView, URCollection, URModel) {

	var URComp = {
		getLayout: function (config) {

      var collection = new URCollection({model: URModel}),
          collectionView = new URCollectionView({
            itemView: URItemView,
            collection: collection,
            showField: !config.idUser? 'nameUser' : 'titleReg'
          }),
          paginationView = new PaginationView({collection: collection}),
          layout = new URLayoutView();

      // Save config on a private var
      defaultParams = config;


      /**
        * Listen events on CollectionView
        */
      layout.listenTo(collectionView, 'itemview:confirmRemove', function (view, model) {

        // Request user confirmation
        App.vent.trigger('app:showConfirm', {
          message: 'Estas seguro de eliminar esta relacion?',
          accept: function () {

            // Destroy model
            model.destroy({
              success: function () {

                // Show success
                App.vent.trigger('app:showSuccess', {
                  message: 'La relacion fue eliminada con exito!'
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

        params = _.extend(params, defaultParams || {});

        App.vent.trigger('app:showSpinner', true);

        collection.remove(collection.models);
        collection.fetch({data: params})
          .always(function () {

            App.vent.trigger('app:showSpinner', false);
          });
      });

      layout.on('render', function () {

        this.table.show(collectionView);
        this.pagination.show(paginationView);
        this.filter(1);
      });

      //
      return layout;
		}
	};

	return URComp;
});
