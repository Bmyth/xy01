define(['backbone','text!template/mainView_template.html',
        'views/blogView','views/timelineView','views/gridView','views/meView',
        'lib/bmyth_plugin/meepo',
        'lib/bmyth_plugin/tristram'],
    function(
        Backbone,viewTemplate,
        blogView,timelineView,gridView,meView,
        meepoPlug,tristramPlug){
    var MainView = Backbone.View.extend({

        initialize: function() {
            this.template = _.template(viewTemplate);

            $.kael('regist',{status:'mainStatus', value:'home', activeEvent:renderHome, inactiveEvent: leaveHome, registHistory:'renderHome'},true);
            $.kael('regist',{status:'mainStatus', value:'blog', activeEvent:renderBlog, registHistory:'renderBlog'},true);
            $.kael('regist',{status:'mainStatus', value:'time line', activeEvent:renderTimeline, registHistory:'renderTimeline'},true);
            $.kael('regist',{status:'mainStatus', value:'grid', activeEvent:renderGrid, registHistory:'renderGrid'},true);
            $.kael('regist',{status:'mainStatus', value:'me', activeEvent:renderMe, registHistory:'renderMe'},true);

            var meepoParams = {size: 800, grandHeight: 640, elementSize : 185, elementMargin: 10, shelfOffset: 360,
                elements:[
                    {title:blogView.title, desc:blogView.desc, frontColor: "#ffffff", backColor: blogView.basicColor, render: blogView.renderGrandElement},
                    {title:timelineView.title, desc:timelineView.desc, frontColor: "#ffffff", backColor: timelineView.basicColor, render: timelineView.renderGrandElement},
                    {title:gridView.title, desc:gridView.desc, frontColor: "#ffffff", backColor: gridView.basicColor, render: gridView.renderGrandElement},
                    {title:meView.title, desc:meView.desc, frontColor: "#ffffff", backColor: meView.basicColor, render:   meView.renderGrandElement}
                ]
            };

            if(!$(".main-view-container").get(0)){
                var content =  $(this.template()).children(".main-view-container");
                $(".container").append($(content));
                $('.content-panel').meepo(meepoParams);
                $('.login').tristram();
            }

            function renderHome(){
                $(".login").show();
                $('.content-panel').meepo(meepoParams, 'home');
            };

            function leaveHome(){
                $(".login").hide();
            };

            function renderBlog(){
                $('.content-panel').meepo(meepoParams, 'blog');
            };

            function renderTimeline(){
                $('.content-panel').meepo(meepoParams, 'time line');
            };

            function renderGrid(){
                $('.content-panel').meepo(meepoParams, 'grid');
            };

            function renderMe(){
                $('.content-panel').meepo(meepoParams, 'me');
            };
        },
        render: function(container, section) {
            $.kael('set', {status:'mainStatus', value:section, active:true, unique: true}, true);
        }
    });

    var mainView = new MainView;

    var initialize = function(){
        mainView.initialize();
    };

    var render = function(container, section){
        mainView.render(container, section);
    };

    return {
        initialize : initialize,
        render : render
    };
})
