define(['backbone', 'text!template/timelineView_template.html'],function(Backbone, viewTemplate){
    var TimelineView = Backbone.View.extend({
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

    var view = new TimelineView;

    var viewName = "timelineView";

    var title = "time line";

    var description = "time line";

    var basicColor = "#5DCEC6";

    var initialize = function(){
        view.initialize();
    };

    var render = function(container){
        view.render(container);
    };

    var renderShelfElement = function(container) {
        view.renderShelfElement(container);
    };

    var renderGrandElement = function(container) {
        view.renderGrandElement(container)
    };

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
