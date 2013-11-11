define(['backbone', 'models/img'], function(Backbone, Img){
    var ImgsCollection = Backbone.Collection.extend({
        url: '/api/imgs',
        model: Img
    });

    var Imgs = new ImgsCollection;

    var initialize = function(callBack){
        Imgs.fetch({success:function(){
            callBack();
        }});
    };

    var create = function(data, success){
        Blogs.create({title:(data.title || ''), bannerCloudurl:(data.bannerUrl || ''), content:(data.content || '')},{success:success});
    };

    return {
        initialize : initialize,
        imgList : Imgs,
        create: create
    };
});
