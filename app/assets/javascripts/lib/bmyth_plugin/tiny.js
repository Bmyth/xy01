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
            var dateIdx = "99-99";
            for(var i = 0 ; i < elements.length; i++){
                var thumbnail = elements[i].thumbnail || defaultThumbnail;
                var desc = elements[i].title || "tiny element " + i;
                var color = elements[i].color || "#000";
                var date  = elements[i].date || dateIdx;

                if(date !== dateIdx){
                    dateIdx = date;
                    var dateElement = $(dateTemplate).appendTo(listContainer);
                    dateElement.find('p').text(dateIdx);
                }

                var ele = $(elementTemplate).css({width:elementWidth, height:elementHeight, margin:elementMargin}).attr('elementId', i).appendTo(listContainer);
                ele.find('.thumbnail').css({maxWidth:elementWidth, maxHeight:elementHeight}).attr('src', thumbnail);
                ele.find('.desc').text(desc);
            }

            $(".tiny-container .tiny-element").click(function(){
                var idx = $(this).attr('elementId');
                if(elements[idx].render){
                    var content = elements[idx].render(idx);
                    $(content).appendTo(detailContainer);
                    detailContainer.fadeIn();
                    $(overlay).show();
                }
            });
        };
	}
});