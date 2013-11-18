define(['backbone', 'views/mainView'],function(Backbone, MainView){
    var AppRouter = Backbone.Router.extend({
        routes : {
            'blog' : blog,
//            'blog/create' : blogCreate,
//            'blog/edit' : blogEdit,
            'blog/:id' :blogShow,
            'nichijou' : nichijou,
            'blueprint' : blueprint,
            'me' : me,
            '*actions' : index
        }
    });

    var initialize = function(){
        var router = new AppRouter;

        $.kael('regist',{status:'mainStatus', value:'home', activeEvent:setHomeRoute, registHistory:'setHomeRoute'},true);
        $.kael('regist',{status:'mainStatus', value:'blog', activeEvent:setBlogRoute, registHistory:'setBlogRoute'},true);
        $.kael('regist',{status:'mainStatus', value:'nichijou', activeEvent:setNichijouRoute, registHistory:'setNichijouRoute'},true);
        $.kael('regist',{status:'mainStatus', value:'blueprint', activeEvent:setBlueprintRoute, registHistory:'setBlueprintRoute'},true);
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

    function nichijou(){
        $.kael('set', {status:'mainStatus', value:'nichijou', active: true, static: true}, true);
        MainView.render($('.container'),'nichijou');
    };

    function blueprint(){
        $.kael('set', {status:'mainStatus', value:'blueprint', active: true, static: true}, true);
        MainView.render($('.container'),'blueprint');
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

    function setNichijouRoute(){
        history.pushState(null, 'nichijou', '#nichijou');
        nichijou();
    }

    function setBlueprintRoute(){
        history.pushState(null, 'blueprint', '#blueprint');
        blueprint();
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
