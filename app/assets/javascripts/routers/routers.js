define(['backbone', 'views/mainView'],function(Backbone, MainView){
    var AppRouter = Backbone.Router.extend({
        routes : {
            'blog' : 'blog',
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


       Backbone.history.start();
    };

    return {
        initialize : initialize
    };
});
