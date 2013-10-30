define(['backbone', 'views/mainView'],function(Backbone, MainView){
    var AppRouter = Backbone.Router.extend({
        routes : {
            'blog' : 'blog',
            'timeline' : 'timeline',
            'grid' : 'grid',
            'me' : 'me',
            '*actions' : 'index'
        }
    });

    var initialize = function(){
        var router = new AppRouter;

        router.on('route:index', function(){
           MainView.render($('.container'));
        });

        router.on('route:blog', function(){
            MainView.render($('.container'),'blog');
        });

        router.on('route:timeline', function(){
            MainView.render($('.container'),'timeline');
        });

        router.on('route:grid', function(){
            MainView.render($('.container'),'grid');
        });

        router.on('route:me', function(){
            MainView.render($('.container'),'me');
        });


       Backbone.history.start();
    };

    return {
        initialize : initialize
    };
});
