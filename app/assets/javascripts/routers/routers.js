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

        $.kael('regist',{status:'mainStatus', value:'home', activeEvent:routeHome, registHistory:'routeHome'},true);
        $.kael('regist',{status:'mainStatus', value:'blog', activeEvent:routeBlog, registHistory:'routeBlog'},true);
        $.kael('regist',{status:'mainStatus', value:'time line', activeEvent:routeTimeline, registHistory:'routeTimeline'},true);
        $.kael('regist',{status:'mainStatus', value:'grid', activeEvent:routeGrid, registHistory:'routeGrid'},true);
        $.kael('regist',{status:'mainStatus', value:'me', activeEvent:routeMe, registHistory:'routeMe'},true);

        router.on('route:index', function(){
           MainView.render($('.container'),'home');
        });

        router.on('route:blog', function(){
            MainView.render($('.container'),'blog');
        });

        router.on('route:timeline', function(){
            MainView.render($('.container'),'time line');
        });

        router.on('route:grid', function(){
            MainView.render($('.container'),'grid');
        });

        router.on('route:me', function(){
            MainView.render($('.container'),'me');
        });

        function routeHome(){
            history.pushState(null, 'home', '#home');
        }

        function routeBlog(){
            history.pushState(null, 'blog', '#blog');
        }

        function routeTimeline(){
            history.pushState(null, 'time line', '#time line');
        }

        function routeGrid(){
            history.pushState(null, 'grid', '#grid');
        }

        function routeMe(){
            history.pushState(null, 'me', '#me');
        }

       Backbone.history.start();
    };

    return {
        initialize : initialize
    };
});
