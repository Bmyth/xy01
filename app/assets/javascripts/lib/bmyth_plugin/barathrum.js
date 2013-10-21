$.fn.extend({
	barathrum: function(params){

        var parent = $(this);

        var size = params.size || 600;
        var shelfSize = params.shelfSize || 20;
        var renderedElementNumber = 3;
        var grandHeight = params.grandHeight || 480;
        var grandItemHeight = params.grandItemHeight || grandHeight / renderedElementNumber;

        var elementIndex = 0;

        var shelfTemplate =  "<div class='barathrum-shelf'>" +
                                    "<div class='specialty-shelf'></div>" +
                                    "<div class='element-shelf'>" +
                                        "<div class='slider'></div>" +
                                    "</div>" +
                                    "<div class='mode-switch'></div>" +
                                 "</div>";
        var specialtyTemplate = "<div class='specialty-item-thumb'></div>";
        var shelfItemTemplate = "<div class='shelf-element'></div>";

        var grandTemplate = "<div class='barathrum-grand'>" +
                            "</div>";

        var specialtyList = params.specialtyList || [];
        var elements = params.elements;

        renderShelf();
        renderGrand();

        function renderShelf(){
            $(shelfTemplate).css({width: size}).prependTo(parent);
            for(var i = 0; i < specialtyList.length; i++){
                var color = specialtyList[i].color;
                var specialty = $(specialtyTemplate).css({backgroundColor:color});
                $('.barathrum-shelf .specialty-shelf').append(specialty);
            }

            $('.barathrum-shelf .slider').css({width:shelfSize * renderedElementNumber, height: shelfSize});

            for(var i = 0; i < elements.length; i++){
                var item = $(shelfItemTemplate).css({backgroundColor: elements[i].color, width:shelfSize, height:shelfSize});
                $('.barathrum-shelf .element-shelf').append(item);
            }

            $('.barathrum-shelf .slider').draggable({
//                grid: [shelfSize, 0],
                containment: ".barathrum-shelf .element-shelf",
                stop : dragHandler
            });

            function dragHandler(event, ui){
                var shelfLength = $('.barathrum-shelf .element-shelf').width();
                var scrollHeight = $(".barathrum-grand").get(0).scrollHeight;

                var scrollTop = ui.position.left/ shelfLength * scrollHeight;
                $(".barathrum-grand").animate({scrollTop:scrollTop},'fast');
            }

            $('.barathrum-shelf').hide();
        };
        function renderGrand(){
            $(grandTemplate).css({width:size, height: grandHeight}).insertAfter($('.barathrum-shelf'));
            //  var sub = elements.slice(elementIndex, elementIndex + renderedElementNumber);
            var sub = elements;
            for(var i = 0; i < sub.length; i++){
                if(sub[i].render){
                    sub[i].render(i).addClass('barathrum-grand-item').attr('barathrumIdx', i).appendTo($('.barathrum-grand'));
                }
            }

//            $('.barathrum-grand').scroll(grandScroll);

            function grandScroll(){
                var scrollHeight = $(".barathrum-grand").get(0).scrollHeight;
                var scrollTop =  $('.barathrum-grand').scrollTop();
                var shelfLength = $('.barathrum-shelf .element-shelf').width();
                var left = scrollTop / scrollHeight * shelfLength;
                $(".barathrum-shelf .slider").stop(true);
                $(".barathrum-shelf .slider").animate({left: left});
            }
        };
	}
});