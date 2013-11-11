$.fn.extend({
	tiny: function(params){

        var parent = $(this);

        var width = params.width || 600;
        var height = params.height || 480;
        var elementWidth = params.elementWidth || 135;
        var elementHeight = params.elementHeight || 135;
        var elementMargin = 10;
        var defaultThumbnail = params.defaultThumbNail || 'assets/tiny_default_thumbnail.jpg';

        var elements = params.elements;

        var gridContainerTemplate = "<div class='tiny-container'>" +
                                        "<div class='list-container'>" +
                                            "<div class='element-list'></div>" +
                                        "</div>" +
                                        "<div class='detail-container'></div>" +
                                    "</div>";
        var elementTemplate = "<div class='tiny-element'>" +
                                "<img class='thumbnail'>" +
                                "<p class='desc'>" +
                                "</p>" +
                              "</div>";
        var addonTemplate = "<div class='tiny-element addon'>" +
            "<img src='assets/tiny/add_blog2.png' style='width: 185px; height:185px;'>" +
            "</div>";
        var editForm = "<form class='tiny-edit-form'>" +
                        "<div class='tiny-edit-panel'>" +
                            "<input class='title'>" +
                            "<div class='banner'>" +
                                "<img src='assets/tiny/add_banner.png'>" +
                                "<p></p>" +
                                "<div class='banner-buffer' style='display: none'><input class='banner-input' type='file'><span class='img-url'></span></div>" +
                            "</div>" +
                            "<p class='opt'>" +
                                "<a class='ok' href='#'>Ok</a>" + "/" +
                                "<a class='cancel' href='#'>Cancel</a>" +
                            "</p>" +
                        "</div>" +
                        "<textarea name='content' style='width:796px;height:560px;'></textarea>" +
                       "</form>";
        var bannerAjaxForm = "<form action='/api/imgAdd' method='post' style='display: none' class='temp-banner-form'>" +
                                "<input id='img_imgSrc' name='img[imgSrc]' type='file'>" +
                             "</form>";


        var overlayTemplate = "<div class='tiny-overlay'></div>";

        var listContainer = parent.find('.tiny-container .element-list').get(0) || $(gridContainerTemplate).prependTo(parent).find('.element-list').get(0);
        width += elementMargin * 2;
        $(".tiny-container .list-container").css({height:height});
        listContainer =  $(listContainer).css({width: width, 'margin-left': -elementMargin});
        var detailContainer = $(".tiny-container .detail-container");

        var overlay = parent.find('.tiny-overlay').get(0) || $(overlayTemplate).prependTo($('body')).get(0);

        $(overlay).click(function(){
            $(this).fadeOut();
            detailContainer.fadeOut().empty();
        });

        render();
        bind();

        function render(){
            listContainer.empty();
            if(params.login){
                var addon = $(addonTemplate).css({width:elementWidth, height:elementHeight, margin:elementMargin}).attr('elementId', -1).appendTo(listContainer);
                addon.find('.thumbnail').css({width:elementWidth, height:elementHeight}).attr('src', 'assets/tiny/add.png');
            }

            for(var i = 0 ; i < elements.length; i++){
                var thumbnail = elements[i].banner || defaultThumbnail;
                var desc = elements[i].title || "tiny element " + i;

                var ele = $(elementTemplate).css({width:elementWidth, height:elementHeight, margin:elementMargin}).attr('elementId', i).appendTo(listContainer);
                ele.find('.thumbnail').css({maxWidth:elementWidth, maxHeight:elementHeight}).attr('src', thumbnail);
                ele.find('.desc').text(desc);
            }
        };

        function bind(){
            var that = this;
            $(".tiny-container .tiny-element:not('.addon')").live('click',function(){
                var idx = $(this).attr('elementId');
                if(elements[idx].render){
                    var content = elements[idx].render(idx);
                    $(content).appendTo(detailContainer);
                    detailContainer.fadeIn();
                    $(overlay).show();
                }
            });

            $(".tiny-element.addon").live('click', function(){
                $(editForm).appendTo(detailContainer);
                $(bannerAjaxForm).appendTo(parent);
                $(".temp-banner-form").ajaxForm();
                KindEditor.create('textarea[name="content"]');
                detailContainer.fadeIn();
                $(overlay).show();
            });

            $(".tiny-edit-panel .banner img").live('click', function(){
                $(".temp-banner-form #img_imgSrc").click();
            });


            $(".temp-banner-form #img_imgSrc").live('change', function(){
                $(".tiny-edit-panel .banner p").text('uploading...');

                $(".temp-banner-form").ajaxSubmit({success:function(r){
                    $(".tiny-edit-panel .banner p").text('');
                    $(".tiny-edit-panel .banner-buffer .img-url").val(r.cloudUrl);
                    $(".tiny-edit-panel .banner img").attr('src', r.cloudUrl);
                }});
            });

            $(".tiny-edit-panel .opt .cancel").live('click', function(){
                $(overlay).click();
            });

            $(".tiny-edit-panel .opt .ok").live('click', function(){
                var blogData = {};
                blogData.title = $('.tiny-edit-panel .title').val();
                blogData.content = $(".tiny-edit-form .ke-edit-iframe").contents().find("body").html();
                blogData.bannerUrl = $(".tiny-edit-panel .banner-buffer .img-url").val();

                params.createBlog(blogData, createSuccess);
            });

            function createSuccess(){
                elements = params.refreshElements();
                render();
                $(overlay).click();
            };
        };
	}
});