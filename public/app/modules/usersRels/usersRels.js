define([
  'underscore',
  'app/app',
  'app/modules/usersRels/collections/rels',
  'app/modules/usersRels/views/layout',
  'app/modules/usersRels/views/collection',
  'app/modules/pagination/views/pagination'
], function (_, app, UsersRelsCollection, UsersRelsCollectionLayout, UsersRelsCollectionView, PaginationView) {

  var usersRels = app.module('UsersRels', function (UsersRels, app) {
    var usersRelsCollection, prevFilterParams, defaultParams;


    /**
      * Collection init
      */
    usersRelsCollection = new UsersRelsCollection([]);


    /**
      * Methods definition
      */
    this.getLayout = function (config) {

      var collectionView = new UsersRelsCollectionView({
          collection: usersRelsCollection,
          showField: !config.idUser? 'nameUser' : 'titleReg'
        }),
        paginationView = new PaginationView({collection: usersRelsCollection}),
        layout = new UsersRelsCollectionLayout(),
        typeReg = 'user';

      // Save config on a private var
      defaultParams = config;

      /**
        * Listen events on CollectionView
        */
      collectionView.on('itemview:confirmRemove', function (view) {

        // Request user confirmation
        app.vent.trigger('app:showConfirm', {
          message: 'Estas seguro de eliminar esta relacion?',
          accept: function () {

            // Destroy model
            view.model.destroy({
              success: function () {

                // Show success
                app.vent.trigger('app:showSuccess', {
                  message: 'La relacion fue eliminada con exito!'
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

        usersRelsCollection.remove(usersRelsCollection.models);
        usersRelsCollection.fetch({data: params});
      });

      layout.on('render', function () {

        this.table.show(collectionView);
        this.pagination.show(paginationView);
        this.filter(1);
      });

      //
      return layout;
    };
  });

  return usersRels;
});
