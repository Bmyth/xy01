define(['backbone', 'models/blog'], function(Backbone, Blog){
    var BlogsCollection = Backbone.Collection.extend({
        url: '/api/blogs',
        model: Blog
    });

    var Blogs = new BlogsCollection;

    var specialtyList = [
                            {name:'prog', color:'#1435AD', status: 'on'},
                            {name:'idea', color:'#4186D3', status: 'on'},
                            {name:'life', color:'#05809E', status: 'on'}
                        ];

    var initialize = function(){
        Blogs.fetch();
        if(Blogs.length == 0){
            Blogs.add([
                { id: 1, title: 'dummy blog1', specialty: 'prog', banner:'assets/blog_thumb/image0.jpg', createTime: "13-08"},
                { id: 2, title: 'dummy blog2', specialty: 'prog', banner:'assets/blog_thumb/image1.jpg', createTime: "13-08"},
                { id: 3, title: 'dummy blog3', specialty: 'idea', banner:'assets/blog_thumb/image2.jpg', createTime: "13-09"},
                { id: 4, title: 'dummy blog4', specialty: 'prog', banner:'assets/blog_thumb/image3.jpg', createTime: "13-10"},
                { id: 5, title: 'dummy blog5', specialty: 'life', banner:'assets/blog_thumb/image4.jpg', createTime: "13-10"},
                { id: 6, title: 'dummy blog6', specialty: 'idea', banner:'assets/blog_thumb/image5.jpg', createTime: "13-10"},
                { id: 7, title: 'dummy blog7', specialty: 'prog', banner:'assets/blog_thumb/image6.jpg', createTime: "13-10"}
            ]);
        }
    };

    var getSpecialty = function(name){
        var item = 0;
        for(var i = 0; i < specialtyList.length; i++){
            if(specialtyList[i].name === name){
                item = specialtyList[i];
                break;
            }
        }
        return item;
    };

    var create = function(data, success){
        Blogs.create({'title':(data.title || ''), 'banner':(data.bannerUrl || ''), 'content':(data.content || '')},{success: success});
    };

    return {
        initialize : initialize,
        blogList : Blogs,
        specialtyList : specialtyList,
        getSpecialty : getSpecialty,
        create: create
    };
});
