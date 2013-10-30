define(['backbone', 'text!template/mainView_template.html', 'views/blogView', 'views/timelineView', 'views/gridView','views/meView'],function(Backbone, viewTemplate, blogView, timelineView, gridView, meView){
    var MainView = Backbone.View.extend({
        subViewList : [],
        status: "",
        events: {

        },
        initialize: function() {
            this.template = _.template(viewTemplate);
            this.subViewList.push(blogView, timelineView, gridView, meView);
            this.status = "home";
        },
        render: function(container, section) {
            if(!$(".main-view-container").get(0)){
                var content =  $(this.template()).children(".main-view-container");
                $(container).append($(content));

                $('.content-panel').meepo({size: 800, grandHeight: 640, elementSize : 185, elementMargin: 10, shelfOffset: 360,
                    elements:[
                        {title:blogView.title, desc:blogView.desc, frontColor: "#ffffff", backColor: blogView.basicColor, render: renderBlog},
                        {title:timelineView.title, desc:timelineView.desc, frontColor: "#ffffff", backColor: timelineView.basicColor, render: renderTimeline},
                        {title:gridView.title, desc:gridView.desc, frontColor: "#ffffff", backColor: gridView.basicColor, render: renderGrid},
                        {title:meView.title, desc:meView.desc, frontColor: "#ffffff", backColor: meView.basicColor, render: renderMe}
                    ], backHomeEvent: backHome
                });

                $('.login').tristram();
            }

            $(".login").hide();
            if(this.status != section){
                $().meepo(section);
                this.status = section;
            }

            if(this.status === 'home'){
                $(".login").show();
            }

            function backHome(){
                this.status = 'home';
                $(".login").show();
                history.pushState({},'home','/');
            };

            function renderBlog(container){
                $(".login").hide();
                blogView.renderGrandElement(container);
                history.pushState({},'blog','/#blog');
            };

            function renderTimeline(container){
                $(".login").hide();
                timelineView.renderGrandElement(container);
                history.pushState({},'timeline','/#timeline');
            };

            function renderGrid(container){
                $(".login").hide();
                gridView.renderGrandElement(container);
                history.pushState({},'grid','/#grid');
            };

            function renderMe(container){
                $(".login").hide();
                meView.renderGrandElement(container);
                history.pushState({},'me','/#me');
            };
        }
    });

    var mainView = new MainView;

    var initialize = function(){
        mainView.initialize();
    };

    var render = function(container, section){
        if(section){
            mainView.render(container, section);
        }else{
            mainView.render(container, 'home');
        }
    };

    return {
        initialize : initialize,
        render : render
    };
})
