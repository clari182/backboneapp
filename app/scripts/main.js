require([
    'jquery',
    'use!underscore',
    'use!backbone',
    'localstorage',
    'use!modules/movie'
],
function($, _, Backbone, localStorage, Movie) {
    
    // 
    var app = _.extend({}, Backbone.Events);
    
    // Navegacion (inicio)
    var Router = Backbone.Router.extend({
        routes: {'': 'index'},
        index: function(){
            Movie.init();
        }
    });
    
    // Cuando se termine de cargar
    $(function () {
        
        // Iniciamos
        app.router = new Router();
        Backbone.history.start();
    });
    
    // Cada vez que se haga click en un a
    $(document).on('click', 'a', function(evt) {
        
        // Evitamos la recarga
        evt.preventDefault();
        
        // Pasamos el link al history
        Backbone.history.navigate($(this).attr('href'), true);
    });
});