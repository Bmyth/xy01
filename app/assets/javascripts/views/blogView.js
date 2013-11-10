define(['backbone', 'text!template/blogView_template.html', 'collections/blogs', 'models/blog', 'jquery-ui'],function(Backbone, viewTemplate, Blogs, Blog, jui){
    var BlogView = Backbone.View.extend({
        blogIndex : 0,
        blogSubLength : 3,
        blogList : [],
        login: false,
        initialize: function() {
            this.template = _.template(viewTemplate);
            Blogs.initialize($.proxy(this.generateBlogList,this));
        },
        render: function(container) {

        },
        generateBlogList : function(){
            var that = this;
            Blogs.blogList.each(function(blog){
                that.blogList.push({
                    title: blog.get('title'),
                    color: "",
                    render: $.proxy(that.renderInDetail, that),
                    banner: blog.get('bannerCloudurl'),
                    date: blog.get('createTime'),
                    id: blog.get('id')
                });
            });
            return this.blogList;
        },
        renderInDetail : function(idx){
            var element = this.blogList[idx];
            var id = element.id;
            var blog = Blogs.blogList.get(id);
            var title = blog.get('title');
            var blogContent = blog.get('content');
            var content = $(this.template()).children(".blog-content");
            content.find('.blog-title').text(title);
            content.find('.blog-content').html(blogContent);
            return content
        },
        renderShelfElement : function(container) {
            var content = $(this.template()).children(".shelf-element").attr('viewName', viewName).css({backgroundColor:basicColor});
            $(container).append(content);
        },
        renderBlog : function(container){
            $(this.template()).children(".grand-element").attr('viewName', viewName).css({backgroundColor:'#fff'}).appendTo(container);
            $('.blog-grand-element').tiny({
                specialtyList: Blogs.specialtyList,
                elements: this.blogList,
                width: 800,
                height: 600,
                elementWidth: 185,
                elementHeight: 185,
                create: Blogs.create,
                refreshElements: $.proxy(this.generateBlogList, this),
                login:this.login});
        }
    });

    var viewName = "blogView";

    var title = "blog";

    var description = "blog";

    var basicColor = "#FFE873";

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
    };

    var login = function(flag){
        view.login = flag;
    };

    return {
        initialize : initialize,
        viewName : viewName,
        title : title,
        desc : description,
        basicColor : basicColor,
        renderShelfElement : renderShelfElement,
        renderGrandElement : renderGrandElement,
        login : login
    };
})
