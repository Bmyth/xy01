define(['backbone', 'text!template/mainView_template.html', 'views/blogView', 'views/timelineView', 'views/gridView','views/meView'],function(Backbone, viewTemplate, blogView, timelineView, gridView, meView){
    var MainView = Backbone.View.extend({
        subViewList : [],
        events: {

        },
        initialize: function() {
            blogView.initialize();
            timelineView.initialize();
            gridView.initialize();
            meView.initialize();
            this.subViewList.push(blogView, timelineView, gridView, meView);
        },
        render: function(container) {
            this.$el = _.template(viewTemplate);
            $(container).append(this.$el);

            blogView.render($('.shelf'));
            timelineView.render($('.shelf'));
            gridView.render($('.shelf'));
            meView.render($('.shelf'));
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
