define(
    ['backbone', 'text!template/blogView_template.html',
     'collections/blogs',
     'lib/bmyth_plugin/tiny','jquery-ui'],
    function(
        Backbone, viewTemplate,
        Blogs,
        tinyPlug, jui)
    {
    var BlogView = Backbone.View.extend({
        blogIndex : 0,
        blogSubLength : 3,
        blogList : [],
        login: true,
        subSection: null,
        initialize: function() {
            this.template = _.template(viewTemplate);
            $.kael('regist',{status:'blogDataReady'},false);
        },
        generateBlogList : function(){
            this.blogList = [];
            var that = this;
            Blogs.blogList.each(function(blog){
                that.blogList.push({
                    title: blog.get('title'),
                    banner: blog.get('bannerCloudurl'),
                    id: blog.get('id')
                });
            });
            return this.blogList;
        },
        renderShelfElement : function(container) {
            var content = $(this.template()).children(".shelf-element").attr('viewName', viewName).css({backgroundColor:basicColor});
            $(container).append(content);
        },
        renderBlog : function(container){
            if(!$.kael('get', {status:'mainStatus', value:'blog'}, true)) {
                return;
            }

            if(!$(".blog-grand-element").get(0)) {
                $(this.template()).children(".grand-element").attr('viewName', viewName).css({backgroundColor: '#fff'}).appendTo(container);
            }

            if($.kael('get', {status:'blogDataReady'}, false)){
                this.generateBlogList();
                $('.blog-grand-element').tiny({
                    elements: this.blogList,
                    width: 800,
                    height: 600,
                    elementWidth: 800,
                    elementHeight: 185,
                    submitBlog: Blogs.submitBlog,
                    readBlog: Blogs.readBlog,
                    deleteBlog: Blogs.deleteBlog,
                    refreshElements: $.proxy(this.generateBlogList, this),
                    optPanel: $('.blog-footer')
                }, this.subSection, this.blogIndex);
            }else{
                Blogs.fetchData($.proxy(this.renderBlog, this));
            }
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

    var renderShelfElement = function(container) {
        view.renderShelfElement(container);
    };

    var renderGrandElement = function(container, subsection, bid){
        view.subSection = subsection;
        view.blogIndex = bid;
        view.renderBlog(container);
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
