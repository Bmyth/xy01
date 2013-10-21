define(['backbone', 'text!template/mainView_template.html', 'views/blogView', 'views/timelineView', 'views/gridView','views/meView'],function(Backbone, viewTemplate, blogView, timelineView, gridView, meView){
    var MainView = Backbone.View.extend({
        subViewList : [],
        events: {

        },
        initialize: function() {
            this.template = _.template(viewTemplate);
            this.subViewList.push(blogView, timelineView, gridView, meView);
        },
        render: function(container) {
            var content =  this.template;
            $(container).append(content);

            $('.content-panel').meepo({
                elements:[
                            {title:blogView.title, desc:blogView.desc, frontColor: "#ffffff", backColor: blogView.basicColor, render: blogView.renderGrandElement},
                            {title:timelineView.title, desc:timelineView.desc, frontColor: "#ffffff", backColor: timelineView.basicColor, render: timelineView.renderGrandElement},
                            {title:gridView.title, desc:gridView.desc, frontColor: "#ffffff", backColor: gridView.basicColor, render: gridView.renderGrandElement},
                            {title:meView.title, desc:meView.desc, frontColor: "#ffffff", backColor: meView.basicColor, render: meView.renderGrandElement}
                ]
            });
        }
    });

    var mainView = new MainView;

    var initialize = function(){
        mainView.initialize();
    };

    var render = function(container){
        mainView.render(container);
    };

    return {
        initialize : initialize,
        render : render
    };
})
