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
            "<p class='cb cb1'>" +
            "<p class='cb cb2'>" +
            "<p class='cb cb3'>" +
            "<p class='cb cb4'>" +
            "</div>";
        var editForm = "<form class='tiny-edit-form'>" +
                        "<div class='tiny-edit-panel'>" +
                            "<input class='title'>" +
                            "<div class='banner'>" +
                                "<img src='assets/tiny/bannerUp.jpg'>" +
                                "<input type='file'>" +
                            "</div>" +
                            "<p class='opt'>" +
                                "<a class='ok' href='#'>Ok</a>" + "/" +
                                "<a class='cancel' href='#'>Cancel</a>" +
                            "</p>" +
                        "</div>" +
                        "<textarea name='content' style='width:796px;height:560px;'></textarea>" +
                       "</form>";
        var dateTemplate = "<div class='date-divider'>" +
                                "<p></p>" +
                           "</div>";

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

        function render(){
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
                KindEditor.create('textarea[name="content"]');
                detailContainer.fadeIn();
                $(overlay).show();
            });

            $(".tiny-edit-panel .banner img").live('click', function(){
                $(".tiny-edit-panel .banner input").click();
            });

            $(".tiny-edit-panel .opt .cancel").live('click', function(){
                $(overlay).click();
            });

            $(".tiny-edit-panel .opt .ok").live('click', function(){
                var blogData = {};
                blogData.title = $('.tiny-edit-panel .title').val();
                blogData.bannerUrl = $('.tiny-edit-panel .banner input').val();
                blogData.content = $(".tiny-edit-form .ke-edit-iframe").contents().find("body").html();
                params.create(blogData, createSuccess);
            });

            function createSuccess(){
                alert('s');
            };
        };
	}
});