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
        render: function(container) {

        },
        generateBlogList : function(){
            this.blogList = [];
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
            var that = this;
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
                    createBlog: Blogs.createBlog,
                    refreshElements: $.proxy(this.generateBlogList, this),
                    optPanel: $('.blog-footer')
                }, this.subSection, this.blogIndex);
            }else{
                Blogs.getData($.proxy(this.renderBlog, this));
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
