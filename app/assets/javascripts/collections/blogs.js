define(['backbone', 'models/blog'], function(Backbone, Blog){
    var BlogsCollection = Backbone.Collection.extend({
        url: '/api/blogs',
        model: Blog
    });

    var Blogs = new BlogsCollection;

    var initialize = function(callBack){
        Blogs.fetch({success:function(){
            callBack();
        }});
    };

    var createBlog = function(data, success){
        Blogs.create({title:(data.title || ''), bannerCloudurl:(data.bannerUrl || ''), content:(data.content || '')},{success:success});
    };

    return {
        initialize : initialize,
        blogList : Blogs,
        createBlog: createBlog
    };
});
