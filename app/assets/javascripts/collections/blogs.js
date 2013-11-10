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

    var initialize = function(callBack){
        Blogs.fetch({success:function(){
            callBack();
        }});
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

    var create = function(data){
        Blogs.add({title:(data.title || ''), bannerCloudurl:(data.bannerUrl || ''), content:(data.content || ''), id:data.id || ''});
    };

    return {
        initialize : initialize,
        blogList : Blogs,
        specialtyList : specialtyList,
        getSpecialty : getSpecialty,
        create: create
    };
});
