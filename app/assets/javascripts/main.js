require.config({
    baseUrl: 'assets',
    paths: {
        'text': 'lib/require_plugin/text'
    },
    shim: {
        'backbone': {
            deps: ['underscore'],
            exports: 'Backbone'
        }
    }
});

require(['routers/routers'],function(Router){
    Router.initialize();
})
