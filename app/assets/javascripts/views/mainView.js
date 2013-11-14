define(['backbone','text!template/mainView_template.html',
        'views/blogView','views/timelineView','views/gridView','views/meView',
        'lib/bmyth_plugin/meepo',
        'lib/bmyth_plugin/tristram'],
    function(
        Backbone, viewTemplate,
        blogView, timelineView,gridView,meView,
        meepoPlug, tristramPlug){
    var MainView = Backbone.View.extend({

        initialize: function() {
            this.template = _.template(viewTemplate);

            if(!$(".main-view-container").get(0)){
                var content =  $(this.template()).children(".main-view-container");
                $(".container").append($(content));
                $('.login').tristram();
            }
        },
        render: function(container, section, subsection, param) {
            var meepoParams = {size: 800, grandHeight: 640, elementSize : 185, elementMargin: 10, shelfOffset: 360,
                elements:[
                    {title:blogView.title, desc:blogView.desc, frontColor: "#ffffff", backColor: blogView.basicColor, render: blogView.renderGrandElement},
                    {title:timelineView.title, desc:timelineView.desc, frontColor: "#ffffff", backColor: timelineView.basicColor, render: timelineView.renderGrandElement},
                    {title:gridView.title, desc:gridView.desc, frontColor: "#ffffff", backColor: gridView.basicColor, render: gridView.renderGrandElement},
                    {title:meView.title, desc:meView.desc, frontColor: "#ffffff", backColor: meView.basicColor, render:   meView.renderGrandElement}
                ]
            };
            $('.content-panel').meepo(meepoParams, section, subsection, param);

            $(".login").hide();
            if(section === 'home')
                $(".login").show();
        }
    });

    var mainView = new MainView;

    var initialize = function(){
        mainView.initialize();
    };

    var render = function(container, section, subsection, param){
        mainView.render(container, section, subsection, param);
    };

    return {
        initialize : initialize,
        render : render
    };
})
