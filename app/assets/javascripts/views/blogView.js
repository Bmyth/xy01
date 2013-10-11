define(['backbone', 'text!template/blogView_template.html'],function(Backbone, viewTemplate){
    var BlogView = Backbone.View.extend({
        subViewList : [],
        events: {

        },
        initialize: function() {

        },
        render: function(container) {
            var content = _.template(viewTemplate);
            $(container).append(content);
        }
    });

    var view = new BlogView;

    var initialize = function(){
        view.initialize();
    };

    var render = function(container){
        view.render(container);
    };

    return {
        initialize : initialize,
        render : render
    };
})
