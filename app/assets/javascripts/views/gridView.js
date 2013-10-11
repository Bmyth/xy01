define(['backbone', 'text!template/gridView_template.html'],function(Backbone, viewTemplate){
    var GridView = Backbone.View.extend({
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

    var view = new GridView;

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
