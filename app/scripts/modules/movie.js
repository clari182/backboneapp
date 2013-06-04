(function () {
    
    var collection, router, templateLoader;
    
	// Definimos movie
	Movie = {views: {}};
	
	// Creamos el modulos
	Movie.Model = Backbone.Model.extend({
		defaults: {
            title: '',
            year: 0,
            genre: ''
        },
        validate: function (attrs) {
            var year = new Date().getFullYear();
            
            if (!attrs.title.trim()) {
                return 'Tenes que ingresar el titulo de la pelicula';
            }
            if (!attrs.year || Number(attrs.year) > year) {
                return 'El a&ntilde,o de la pelicula debe ser menor o igual a '+year;
            }
            if (!attrs.genre.trim()) {
                return 'Tenes que ingresar el genero de la pelicua';
            }
        }
	});
	
    
	// Creamos la lista
	Movie.Collection = Backbone.Collection.extend({
		model: Movie.Model,
        localStorage: new Backbone.LocalStorage('Movies')
	});
    collection = new Movie.Collection([]);
    collection.fetch();
    
    
    // Navegacion
    Movie.Router = Backbone.Router.extend({
        routes: {
            'movies/:id': 'details',
            'genre/:name': 'filter'
        },
        details: function (id) {
            
            var model = collection.get(id),
                detail;
            if (!!model) {
                
                detail = new Movie.views.Details();
                detail.render(model);
            }
        },
        filter: function (genre) {
            var list = new Movie.views.List(collection);
            list.filterGenre = genre;
            list.filterByGenre();
        }
    });
    router = new Movie.Router();
    
    
    // Metodo para cargar las interfaces sin cachear
    templateLoader = function (url, callback) {
        var dfd = new $.Deferred();
        
        // Buscamos el template
        $.ajax({
            url: url,
            dataType: 'text',
            success: function (html) {
                // Creamos el template desde el HTML
                var tpl = _.template(html);
                
                // Devolvemos el template
                callback(tpl);
                
                // Resolvemos
                dfd.resolve(tpl);
            }
        });
        
        // Prometemos
        return dfd.promise();
    };
    
	
	// Creamos la vista de la ficha
	Movie.views.List = Backbone.View.extend({
		template: 'templates/movies/list.html',
		render: function () {
            var self = this;
            
            templateLoader(this.template, function (tpl) {
                self.$el.html(tpl({movies: self.collection.toJSON()}));
                
                // Cargamos la vista
                $('#main').html(self.el);
                
                // Creamos el filtro con los generos
                self.$el.find('#filter').append(self.createSelect());
                
                // Configuramos eventos a escuchar
                self.on('change:filterGenre', self.filterByGenre, self);
                self.on('click:add', self.onAddMovie, self);
            });
		},
        initialize: function () {
            
            this.collection = collection.clone();
            
            // Cuando la lista se actualice, renderizamos de nuevo
            // @TODO aprender como carajo hago para que al re-renderizar se asignen nuevamente los eventos
            this.collection.on('reset', this.render, this);
            /*this.collection.on('add', Movie.init, this);
            this.collection.on('edit', Movie.init, this);*/
            this.collection.on('remove', Movie.init, this);
        },
        filterGenre: 'all',
        createSelect: function () {
            var filter = this.$el.find('#filter'),
                select = $('<select/>', {html: '<option value="all">Todos</option>'}),
                genres = _.uniq(this.collection.pluck('genre'), false, function (genre) {
                    return genre;
                }),
                genreSet = this.filterGenre;
            
            _.each(genres, function (genre) {
                
                var option = $('<option/>', {
                    value: genre.toLowerCase(),
                    text: genre
                }).appendTo(select);
                
                if (genreSet === genre.toLowerCase()) {
                    option[option.length - 1].selected = true;
                }
            });
            
            return select;
        },
        
        className: 'movie',
        
        
        // Configuramos eventos sobre los elementos
        events: {
            'change #filter select': 'setGenreFilter',
            'click button.add': 'addMovie',
            'click button.edit': 'editMovie',
            'click button.remove': 'removeMovie'
        },
        
        //
        setGenreFilter: function (e) {
            this.filterGenre = e.currentTarget.value;
            this.trigger('change:filterGenre');
        },
        
        filterByGenre: function () {
            var genre = this.filterGenre,
                filtered = collection.models;
            
            // Reiniciamos las peliculas, sin acutalizar
            this.collection.reset(filtered, {silent: true});
            
            // Si se filtro algo
            if (this.filterGenre !== 'all') {
                
                filtered = _.filter(this.collection.models, function (movie) {
                    return movie.get('genre').toLowerCase() === genre;
                });
                router.navigate('genre/' + genre);
            } else {
                router.navigate('');
            }
            this.collection.reset(filtered);
        },
        
        addMovie: function () {
            var edit = new Movie.views.Edit();
            edit.render(new Movie.Model());
        },
        
        editMovie: function (evt) {
            var edit = new Movie.views.Edit();
            edit.render(collection.get(evt.target.value));
        },
        
        removeMovie: function (evt) {
            var model = collection.get(evt.target.value);
            if (model && confirm('Estas seguro que queres eliminar "' + model.get('title') + '"?')) {
                
                model.destroy();
                collection.trigger('remove');
            }
        }
	});
    
	
	// Creamos la vista de la ficha
	Movie.views.Details = Backbone.View.extend({
		template: 'templates/movies/details.html',
		render: function (model) {
			var self = this;
            
            templateLoader(this.template, function (tpl) {
                
                self.$el.html(tpl(model.toJSON()));
                $('#main').html(self.el);
            });
		},
        className: 'movies'
	});
    
	
	// Creamos la vista de la ficha
	Movie.views.Edit = Backbone.View.extend({
		template: 'templates/movies/edit.html',
		render: function (model) {
			var self = this;
            
            this.model = model;
            templateLoader(this.template, function (tpl) {
                
                self.$el.html(tpl(self.model.toJSON()));
                $('#main').html(self.el);
                
                self.model.on('invalid', function(model, error) {
                    // hecho asi para ahorrar tiempo
                    alert(error);
                });
            });
		},
        
        
        // Configuramos eventos sobre los elementos
        events: {
            'click button.save': 'saveMovie',
            'click button.cancel': 'cancelMovie'
        },
        
        //
        saveMovie: function (evt) {
            var model = collection.get(this.model.get('id')),
                attrs = {};
            
            // Leemos los datos
            $(evt.target).closest('form').find(':input').not('button').each(function () {
                var el = $(this);
                attrs[el.attr("class")] = el.val();
            });
            attrs.year = Number(attrs.year);
            
            this.model.set(attrs);
            
            // Si no dio error
            if (this.model.isValid()) {
                
                // Si esta el registro en la lista
                if (!model) {
                    
                    collection.add([this.model]);
                    collection.trigger('add');
                }
                else {
                    
                    collection.trigger('edit');
                }
                
                // Guardamos
                this.model.save();
				Movie.init();
            }
        },
        cancelMovie: function () {
            var list = new Movie.views.List(collection);
            list.render();
        }
	});
    
    //
    Movie.init = function () {
        var list = new Movie.views.List(collection);
        list.render();
    };
    
    return Movie;
}());