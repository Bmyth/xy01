define(['backbone'], function(Backbone){
    var Blog = Backbone.Model.extend({
        title : "",
        banner: "",
        desc: "",
        content : "",
        id: "",
        tag: "",
        specialty: "",
        createTime: "",
        updateTime: "",

        initialize : function() {

        }
    });

    return Blog;
})
