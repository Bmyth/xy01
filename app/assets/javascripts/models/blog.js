define(['backbone'], function(Backbone){
    var Blog = Backbone.Model.extend({
        title : "",
        bannerCloudurl: "",
        content : "",
        id: "",
        tag: "",
        specialty: "",
        created_at: "",
        updated_at: "",

        initialize : function() {

        }
    });

    return Blog;
})
