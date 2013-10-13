define(['backbone', 'text!template/blogView_template.html'],function(Backbone, viewTemplate){
    var BlogView = Backbone.View.extend({
        subViewList : [],
        events: {

        },
        initialize: function() {
            this.template = _.template(viewTemplate);
        },
        render: function(container) {
            var content = this.template;
            $(container).append(content);
        },
        renderShelfElement : function(container) {
            var content = $(this.template()).children(".shelf-element").attr('viewName', viewName).css({backgroundColor:basicColor});
            $(container).append(content);
        },
        renderGrandElement : function(container){
            var content = $(this.template()).children(".grand-element").attr('viewName', viewName).css({backgroundColor:basicColor});
            $(container).append(content);
        }
    });

    var viewName = "blogView";

    var title = "blog";

    var description = "blog";

    var basicColor = "#B0DCF9";

    var view = new BlogView;

    var initialize = function(){
        view.initialize();
    };

    var render = function(container){
        view.render(container);
    };

    var renderShelfElement = function(container) {
        view.renderShelfElement(container);
    };

    var renderGrandElement = function(container){
        view.renderGrandElement(container);
    }

    return {
        initialize : initialize,
        viewName : viewName,
        title : title,
        desc : description,
        basicColor : basicColor,
        renderShelfElement : renderShelfElement,
        renderGrandElement : renderGrandElement
    };
})
