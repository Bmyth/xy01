define(['backbone', 'text!template/blogView_template.html', 'collections/blogs', 'models/blog', 'jquery-ui'],function(Backbone, viewTemplate, Blogs, Blog, jui){
    var BlogView = Backbone.View.extend({
        blogIndex : 0,
        blogSubLength : 3,
        blogList : [],
        initialize: function() {
            this.template = _.template(viewTemplate);
            Blogs.initialize();
            this.generateBlogList();
        },
        render: function(container) {

        },
        generateBlogList : function(){
            var that = this;
            Blogs.blogList.each(function(blog){
                var color = Blogs.getSpecialty(blog.get('specialty')).color;
                that.blogList.push({color: color, render: $.proxy(that.renderInGrandList, that), id:blog.get('id')});
            });
        },
        renderInGrandList : function(idx){
            var element = this.blogList[idx];
            var id = element.id;
            var blog = Blogs.blogList.get(id);
            var color = element.color;
            var title = blog.get('title');
            var content = $(this.template()).children(".listed-blog-item");
            content.find('.specialty-flag').css({backgroundColor:color});
            content.find('.title').text(title);
            return content
        },
        renderShelfElement : function(container) {
            var content = $(this.template()).children(".shelf-element").attr('viewName', viewName).css({backgroundColor:basicColor});
            $(container).append(content);
        },
        renderBlog : function(container){
            $(this.template()).children(".grand-element").attr('viewName', viewName).css({backgroundColor:'#fff'}).appendTo(container);
            $('.blog-grand-element').barathrum({specialtyList: Blogs.specialtyList ,elements: this.blogList, size: 600});
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
        view.renderBlog(container);
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
