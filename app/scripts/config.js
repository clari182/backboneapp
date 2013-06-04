require.config({
    deps: ['main'],
	paths: {
		underscore: 'vendor/underscore/underscore',
		jquery: 'vendor/jquery/jquery',
		backbone: 'vendor/backbone/backbone',
        localstorage: 'vendor/plugins/backbone.localStorage',
    
        // Shim Plugin
        use: 'vendor/plugins/use'
	},

    use: {
        underscore: {
            attach: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            attach: 'Backbone'
        },
        'modules/movie': {
            deps: ['underscore', 'jquery', 'backbone'],
            attach: 'Movie'
        }
    }
});