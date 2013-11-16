define(['backbone', 'views/mainView'],function(Backbone, MainView){
    var AppRouter = Backbone.Router.extend({
        routes : {
            'blog' : blog,
//            'blog/create' : blogCreate,
//            'blog/edit' : blogEdit,
            'blog/:id' :blogShow,
            'timeline' : timeLine,
            'grid' : grid,
            'me' : me,
            '*actions' : index
        }
    });

    var initialize = function(){
        var router = new AppRouter;

        $.kael('regist',{status:'mainStatus', value:'home', activeEvent:setHomeRoute, registHistory:'setHomeRoute'},true);
        $.kael('regist',{status:'mainStatus', value:'blog', activeEvent:setBlogRoute, registHistory:'setBlogRoute'},true);
        $.kael('regist',{status:'mainStatus', value:'time line', activeEvent:setTimelineRoute, registHistory:'setTimelineRoute'},true);
        $.kael('regist',{status:'mainStatus', value:'grid', activeEvent:setGridRoute, registHistory:'setGridRoute'},true);
        $.kael('regist',{status:'mainStatus', value:'me', activeEvent:setMeRoute, registHistory:'setMeRoute'},true);

        $.kael('regist',{status:'blogStatus', value:'list', activeEvent:setBlogListRoute, registHistory:'setBlogListRoute'},true);
        $.kael('regist',{status:'blogStatus', value:'create', activeEvent:setBlogCreateRoute, registHistory:'setBlogCreateRoute'},true);
        $.kael('regist',{status:'blogStatus', value:'edit', activeEvent:setBlogEditRoute, registHistory:'setBlogEditRoute'},true);
        $.kael('regist',{status:'blogStatus', value:'show', activeEvent:setBlogShowRoute, registHistory:'setBlogShowRoute'},true);

        Backbone.history.start();
    };

    function index(){
        $.kael('set', {status:'mainStatus', value:'home', active: true, static: true}, true);
        MainView.render($('.container'),'home');
    };

    function blog(){
        $.kael('set', {status:'mainStatus', value:'blog', active: true, static: true}, true);
        $.kael('set', {status:'blogStatus', value:'list', active: true, static: true}, true);
        MainView.render($('.container'),'blog', 'list');
    };

    function blogCreate(){
        $.kael('set', {status:'mainStatus', value:'blog', active: true, static: true}, true);
        $.kael('set', {status:'blogStatus', value:'create', active: true, static: true}, true);
        MainView.render($('.container'),'blog', 'create');
    };

    function blogEdit(id){
        $.kael('set', {status:'mainStatus', value:'blog', active: true, static: true}, true);
        $.kael('set', {status:'blogStatus', value:'edit', active: true, static: true}, true);
        MainView.render($('.container'),'blog', 'edit', id);
    };

    function blogShow(id){
        $.kael('set', {status:'mainStatus', value:'blog', active: true, static: true}, true);
        $.kael('set', {status:'blogStatus', value:'show', active: true, param: id, static: true}, true);
        MainView.render($('.container'),'blog', 'show', id);
    };

    function timeLine(){
        $.kael('set', {status:'mainStatus', value:'time line', active: true, static: true}, true);
        MainView.render($('.container'),'time line');
    };

    function grid(){
        $.kael('set', {status:'mainStatus', value:'grid', active: true, static: true}, true);
        MainView.render($('.container'),'grid');
    };

    function me(){
        $.kael('set', {status:'mainStatus', value:'me', active: true, static: true}, true);
        MainView.render($('.container'),'me');
    };

    function setHomeRoute(){
        history.pushState(null, 'home', '#');
        index();
    }

    function setBlogRoute(){
        history.pushState(null, 'blog', '#blog');
        blog();
    }

    function setTimelineRoute(){
        history.pushState(null, 'time line', '#time line');
        timeLine();
    }

    function setGridRoute(){
        history.pushState(null, 'grid', '#grid');
        grid();
    }

    function setMeRoute(){
        history.pushState(null, 'me', '#me');
        me();
    }

    function setBlogListRoute(){
        history.pushState(null, 'blog list', '#blog');
        blog();
    }

    function setBlogCreateRoute(){
        history.pushState(null, 'blog create', '#blog/create');
        blogCreate();
    }

    function setBlogEditRoute(){
        var id = $.kael('param', {status:'blogStatus', value:'edit'}, true);
        history.pushState(null, 'blog edit', '#blog/edit/' + id);
        blogEdit(id);
    }

    function setBlogShowRoute(){
        var id = $.kael('param', {status:'blogStatus', value:'show'}, true);
        history.pushState(null, 'blog show', '#blog/' + id);
        blogShow(id);
    }

    return {
        initialize : initialize
    };
});
