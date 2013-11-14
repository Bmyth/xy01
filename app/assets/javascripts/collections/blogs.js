define(['backbone', 'models/blog'], function(Backbone, Blog){
    var BlogsCollection = Backbone.Collection.extend({
        url: '/api/blogs',
        model: Blog
    });

    var Blogs = new BlogsCollection;

    var initialize = function(){
        getData();
    };

    var createBlog = function(data, success){
        Blogs.create({title:(data.title || ''), bannerCloudurl:(data.bannerUrl || ''), content:(data.content || '')},{success:success});
    };

    var getData = function(callback){
        $.kael('set', {status:'blogDataReady', active:false}, false);
        Blogs.fetch({success:function(){
            $.kael('set', {status:'blogDataReady', active:true}, false);
            if(callback)
                callback();
        }});
    };

    return {
        initialize : initialize,
        blogList : Blogs,
        getData : getData,
        createBlog: createBlog
    };
});
