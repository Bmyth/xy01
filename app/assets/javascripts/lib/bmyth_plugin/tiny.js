$.fn.extend({
	tiny: function(params, subsection, bid){
        var parent = $(this);

        var width = params.width || 600;
        var height = params.height || 480;
        var elementWidth = params.elementWidth || 135;
        var elementHeight = params.elementHeight || 135;
        var elementMargin = 10;
        var defaultThumbnail = 'assets/tiny_default_thumbnail.jpg';

        var elements = params.elements;

        var gridContainerTemplate = "<div class='tiny-container'>" +
                                        "<div class='list-container'>" +
                                            "<div class='element-list'></div>" +
                                        "</div>" +
                                        "<div class='detail-container'></div>" +
                                    "</div>";
        var elementTemplate = "<div class='tiny-element'>" +
                                "<img class='thumbnail'>" +
                                "<div class='desc'>" +
                                    "<p></p>" +
                                "</div>" +
                              "</div>";
        var optTemplate = "<div class='tiny-opt'></div>";
        var createTemplate = "<span class='create opt-item'>create</span>";
        var submitTemplate = "<span class='submit opt-item'>submit</span>";
        var editTemplate = "<span class='edit opt-item'>edit</span>";
        var deleteTemplate = "<span class='delete opt-item'>delete</span>";
        var backTemplate = "<span class='back opt-item'>back</span>";

        var blogContentTemplate =  "<div class='blog-content'>" +
                                        "<p class='blog-title'></p>" +
                                        "<div class='blog-content'></div>" +
                                    "</div>";
        var bidRecordTemplate = "<p class='blog-id' style='display: none'></p>";

        var editForm = "<form class='tiny-edit-form'>" +
                        "<div class='tiny-edit-panel'>" +
                            "<input class='title'>" +
                            "<div class='banner'>" +
                                "<img src='assets/tiny/add_banner.png'>" +
                                "<p></p>" +
                                "<div class='banner-buffer' style='display: none'><input class='banner-input' type='file'><span class='img-url'></span></div>" +
                            "</div>" +
                        "</div>" +
                        "<textarea name='content' style='width:796px;height:560px;'></textarea>" +
                       "</form>";
        var bannerAjaxForm = "<form action='/api/imgCreate' method='post' style='display: none' class='temp-banner-form'>" +
                                "<input id='img_imgSrc' name='img[imgSrc]' type='file'>" +
                             "</form>";

        var overlayTemplate = "<div class='tiny-overlay'></div>";

        var listContainer = parent.find('.tiny-container .element-list').get(0) || $(gridContainerTemplate).prependTo(parent).find('.element-list').get(0);
        listContainer =  $(listContainer).css({width: width + elementMargin * 2, 'margin-left': -elementMargin});
        $(".tiny-container .list-container").css({height:height});
        var detailContainer = $(".tiny-container .detail-container");
        var optPanel = $(params.optPanel).find('.tiny-opt').get(0) || $(optTemplate).appendTo(params.optPanel).get(0);
        var overlay = $('body').find('.tiny-overlay').get(0) || $(overlayTemplate).prependTo($('body')).get(0);
        var bidRecord = $(params.optPanel).find('.blog-id').get(0) || $(bidRecordTemplate).appendTo($(params.optPanel)).get(0);

        $.kael('regist',{status:'blogRendered', registHistory:'blogRendered'},false);
        if(!$.kael('get',{status:'blogRendered', active: true},false)){
            bind();
            $.kael('set',{status:'blogRendered', active: true, static:true},false);
        }

        if(!subsection ||subsection === 'list')
            renderListMode();
        else if(subsection === 'create')
            renderCreateMode();
        else if(subsection === 'edit')
            renderEditMode();
        else if(subsection === 'show')
            renderShowMode();

        function renderListMode(){
            renderBlogList();
            setBlogListOpt();
        };

        function renderCreateMode(){
            if($.kael('get',{status:'login'},false)){
                renderBlogForm();
                setBlogCreateOpt();
            }else{
                $.kael('set',{status:'blogStatus', value:'list', active: true, unique:true}, true);
            }
        };

        function renderEditMode(){
            if($.kael('get',{status:'login'},false)){
                var blog = params.readBlog(bid);
                renderBlogForm(blog);
                setBlogCreateOpt();
            }else{
                $.kael('set',{status:'blogStatus', value:'list', active: true, unique:true}, true);
            }
        };

        function renderShowMode(){
            var blog = params.readBlog(bid);
            if(blog){
                var content = $(blogContentTemplate).appendTo($(".tiny-container .detail-container"));
                content.find('.blog-title').text(blog.title);
                $(".tiny-edit-form .ke-edit-iframe").contents().find("body").html(blog.content);
                $(".tiny-container .detail-container").fadeIn();
                $(overlay).show();
                $(bidRecord).text(blog.id);
            }else{
                $.kael('set',{status:'blogStatus', value:'list', active: true, unique:true}, true);
            }
            setBlogShowOpt();
        };

        function renderBlogList(){
            $(listContainer).empty();

            for(var i = 0 ; i < elements.length; i++){
                var thumbnail = elements[i].banner || defaultThumbnail;
                var desc = elements[i].title || "tiny element " + i;

                var ele = $(elementTemplate).css({width:elementWidth, height:elementHeight, margin:elementMargin}).attr('elementId', elements[i].id).appendTo(listContainer);
                ele.find('.thumbnail').css({maxWidth:160, maxHeight:160}).attr('src', thumbnail);
                ele.find('.desc p').text(desc);
            }
        };

        function renderBlogForm(blog){
            detailContainer.empty();
            $(editForm).appendTo(detailContainer);
            $(bannerAjaxForm).appendTo(parent);
            $(".temp-banner-form").ajaxForm();
            KindEditor.create('textarea[name="content"]');
            detailContainer.fadeIn();
            $(overlay).show();

            if(blog){
                $('.tiny-edit-panel .title').val(blog.title);
                $(".tiny-edit-form .ke-edit-iframe").contents().find("body").html(blog.content);
                $(".tiny-edit-panel .banner img").attr('src', blog.bannerUrl);
                $(bidRecord).text(blog.id);
            }
        };

        function bind(){
            $(overlay).live('click',function(){
                $(this).hide();
                $(".tiny-container .detail-container").fadeOut().empty();
                $.kael('set',{status:'blogStatus', value:'list', active: true, unique:true}, true);
            });

            $(".tiny-container .tiny-element").live('click',function(){
                var idx = $(this).attr('elementId');
                $.kael('set',{status:'blogStatus', value:'show', active: true, unique:true, param:idx}, true);
            });

            $(".tiny-opt .create").live('click', function(){
                $.kael('set',{status:'blogStatus', value:'create', active: true, unique:true}, true);
            });

            $(".tiny-edit-panel .banner img").live('click', function(){
                $(".temp-banner-form #img_imgSrc").click();
            });

            $(".temp-banner-form #img_imgSrc").live('change', function(){
                $(".tiny-edit-panel .banner p").text('uploading...');
                $(".temp-banner-form").ajaxSubmit({success:function(r){
                    $(".tiny-edit-panel .banner p").text('');
                    $(".tiny-edit-panel .banner img").attr('src', r.cloudUrl);
                }});
            });

            $(".tiny-opt .edit").live('click', function(){
                var id = $.kael('param', {status:'blogStatus', value:'show'}, true);
                if(id){
                    $.kael('set',{status:'blogStatus', value:'edit', active: true, param:id, unique:true}, true);
                }
            });

            $(".tiny-opt .delete").live('click', function(){
                var id = $(bidRecord).text();
                params.deleteBlog(id, submitSuccess);
            });

            $(".tiny-opt .submit").live('click', function(){
                var blogData = {};
                blogData.id = $(bidRecord).text();
                blogData.title = $('.tiny-edit-panel .title').val();
                blogData.content = $(".tiny-edit-form .ke-edit-iframe").contents().find("body").html();
                blogData.bannerUrl = $(".tiny-edit-panel .banner img").attr('src');
                params.submitBlog(blogData, submitSuccess);
            });

            $(".tiny-opt .back").live('click', function(){
                $(overlay).click();
            });

            $.kael('regist',{status:'blogStatus', value:'list', activeEvent:setBlogListOpt, registHistory:'setBlogListOpt'},true);
            $.kael('regist',{status:'blogStatus', value:'create', activeEvent:setBlogCreateOpt, registHistory:'setBlogCreateOpt'},true);
            $.kael('regist',{status:'blogStatus', value:'show', activeEvent:setBlogShowOpt, registHistory:'setBlogShowOpt'},true);

            function submitSuccess(){
                $(bidRecord).text('');
                elements = params.refreshElements();
                renderBlogList();
                $(overlay).click();
            };
        };

        function setBlogListOpt(){
            $(optPanel).empty();
            if($.kael('get',{status:'login'},false)){
                $(optPanel).append(createTemplate);
            }
        };

        function setBlogCreateOpt(){
            $(optPanel).empty().append(submitTemplate).append(backTemplate);
        };

        function setBlogShowOpt(){
            $(optPanel).empty();
            if($.kael('get',{status:'login'},false)){
                $(optPanel).append(editTemplate).append(deleteTemplate);
            }
            $(optPanel).append(backTemplate);
        };
	}
});