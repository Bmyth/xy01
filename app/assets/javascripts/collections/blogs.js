define(['backbone', 'models/blog'], function(Backbone, Blog){
    var BlogsCollection = Backbone.Collection.extend({
        url: '/api/blogs',
        model: Blog
    });

    var Blogs = new BlogsCollection;

    var initialize = function(){
        fetchData();
    };

    var fetchData = function(callback){
        $.kael('set', {status:'blogDataReady', active:false}, false);
        Blogs.fetch({success:function(){
            $.kael('set', {status:'blogDataReady', active:true}, false);
            if(callback)
                callback();
        }});
    };

    var submitBlog = function(data, success){
        if(data.id !== ""){
            var blog = Blogs.get(data.id);
            if(blog)
                blog.save({title:(data.title || ''), bannerCloudurl:(data.bannerUrl || ''), content:(data.content || '')},{success:success});
        }else{
            Blogs.create({title:(data.title || ''), bannerCloudurl:(data.bannerUrl || ''), content:(data.content || '')},{success:success});
        }
    };

    var readBlog = function(bid){
        var b = Blogs.get(bid);
        if(b){
            return {id: bid, title: b.get('title'), content: b.get('content'), bannerUrl: b.get('bannerCloudurl')};
        }
    };

    var deleteBlog = function(bid, success){
        Blogs.get(bid).destroy({success:success});
    }

    return {
        initialize : initialize,
        blogList : Blogs,
        fetchData : fetchData,
        submitBlog: submitBlog,
        readBlog: readBlog,
        deleteBlog: deleteBlog
    };
});
