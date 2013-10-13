$.fn.extend({
	meepo: function(params){

        var parent = $(this);

        var size = params.size || 600;

        var defaultShelfOffset = "300px";
        var elementNumber = getElementNumber();
        var elementSize = size/elementNumber * 0.8;
        var elementMargin = size/elementNumber * 0.1;
        var elementOffset = size/elementNumber;
        var defaultFrontColor = "#ffffff";
        var defaultBackColor = "#cccccc";
        var defaultTitle = "element title";
        var defaultDesc = "element description";
        var defaultMenuHeight = 40;

	    var meepoTemplate = "<div class='meepo-shelf'>" +
                        "<div class='slider'></div>" +
                            "<div class='main-view-element shelf-element'>" +
                                "<span>home</span>" +
                                "<p class='desc'>home</p>" +
                            "</div>" +
                        "</div>" +
                    "<p class='meepo-desc'></p>" +
                    "<div class='meepo-grand'></div>";


        var shelfElementTemplate = "<div class='shelf-element'>" +
            "<span></span>" +
            "<p class='desc'></p>" +
            "</div>";

        var grandElementTemplate = "<div class='grand-element'></div>"

        var shelfOffset = params.shelfOffset || defaultShelfOffset;
        var elementSmallSize = params.elementSmallSize || defaultMenuHeight;
        var grandHeight = params.grandHeight || size;
        var homeFrontColor = params.homeFrontColor || defaultFrontColor;
        var homeBackColor = params.homeBackColor || defaultBackColor;
        $(meepoTemplate).appendTo(parent);

        $(".meepo-shelf").css("width",size);
        $(".meepo-grand").css("width",size);
        $(".meepo-shelf .slider ").css("width", elementSize);

        renderShelf();

        var ghost = '<div class="ghost"></div>';
        $('.main-view-element').css({color:homeFrontColor, backgroundColor:homeBackColor}).addClass("disappeared");
        $('.shelf-element:not(".main-view-element")').addClass('click-to-render').append($(ghost));
        $(".meepo-shelf .shelf-element .ghost").css("width", elementSize);

        function renderShelf(){
            if(params.elements){
               for(var i = 0; i < params.elements.length; i++){
                   renderShelfElement(params.elements[i], i);
               }
            }
        }

        shelfIndex();
        menuSlider();

        $('.shelf-element.click-to-render').live('click',transformToGrandView);
        $('.shelf-element.click-to-switch').live('click',switchGrandView);
        $('.main-view-element').click(transformToMainView);

        function shelfIndex(){
            $('.shelf-element:not(".disappeared")').each(function(idx){
                $(this).val(idx);
            });
        };

        function menuSlider(){
            $('.meepo-shelf .shelf-element').each(function(){
                $(this).hover(mouseInShelfElement, mouseOutShelfElement);
            });
            $('.meepo-shelf').mouseleave(hideSlider);
        };

        function mouseInShelfElement(){
            var left = $(this).val() * elementOffset + elementMargin;
            var color = $(this).css('background-color');
            var desc = $(this).children(".desc").text();
            $(".meepo-shelf .slider").css({height :'2px', backgroundColor: color}).animate({left:left}, "fast");
            $(".meepo-desc").text(desc);
        }

        function mouseOutShelfElement(){
            $(".meepo-shelf .slider").stop(true);
        }

        function hideSlider(){
            $('.meepo-desc').text('');
            $(".meepo-shelf .slider").css("height", "0");
        }

        function renderShelfElement(ele, idx){
           var frontColor = ele.frontColor || defaultFrontColor;
           var backColor = ele.backColor || defaultBackColor;
           var shelfContainer = parent.find('.meepo-shelf');
           if(ele.shelfElement){
               $(ele.shelfElement).css({
                   'float':'left',
                   'height':elementSize,
                   'width':elementSize,
                   'margin':elementMargin,
                   'color': frontColor,
                   'backgroundColor': backColor
               }).addClass("shelf-element").appendTo(shelfContainer);
           }else if(ele.renderShelf){
               ele.rendShelf(shelfContainer);
           }else{
               var title = ele.title || defaultTitle;
               var desc = ele.desc || defaultDesc;
               var element = $(shelfElementTemplate).css({
                   'float':'left',
                   'height':elementSize,
                   'width':elementSize,
                   'margin':elementMargin,
                   'color': frontColor,
                   'backgroundColor': backColor
               }).attr('eleIndex',idx);
               element.children('span').text(title);
               element.children('.desc').text(desc);
               element.appendTo(shelfContainer);
           }
        }

        function getElementNumber(){
            if(params.elements){
                return params.elements.length;
            }
        }

        var transformMode = "";

       function transformToGrandView(){
            transformMode = "toGrand";
            hideSlider();
            $(".shelf-element.disappeared").removeClass("disappeared");
            $(this).addClass('disappeared');
            shelfUp();
        };

        function transformToMainView(){
            transformMode = "toMain";
            hideSlider();
            pushMainElementOut();
        };

        function switchGrandView(){
            transformMode = "switch";
            hideSlider();
            $(this).addClass('to-switch');
            pushMainElementOut();

        };

        function renderGrand(){
            $(".meepo-grand").find(".grand-element").remove();
            var idx = $(".shelf-element.disappeared").attr('eleIndex');
            if(params.elements){
                var ele = params.elements[idx];
                var frontColor = ele.frontColor || defaultFrontColor;
                var backColor = ele.backColor || defaultBackColor;
                if(ele.grandElement){
                    $(ele.grandElement).css({
                        'height':grandHeight,
                        'width':size,
                        'color': frontColor,
                        'backgroundColor': backColor
                    }).addClass("grand-element").appendTo($('.meepo-grand'));
                }else if(params.elements[idx].render){
                    params.elements[idx].render('.meepo-grand');
                }else{
                    $(grandElementTemplate).css({
                        'height':grandHeight,
                        'width':size,
                        'color': frontColor,
                        'backgroundColor': backColor
                    }).appendTo($('.meepo-grand'));
                }
            }
        };

        function shelfUp(){
            $('.meepo-desc').hide();

            shelfIndex();
            renderGrand();

            $(".click-to-render").addClass("click-to-switch").removeClass("click-to-render");
            $('.meepo-shelf').animate({'margin-top': '0'},'fast', pushSelectedElementDown);
            $('.shelf-element').animate({height:elementSmallSize}, 'fast');
        };

        function shelfBack(){
            $(".shelf-element.disappeared").removeClass("disappeared");
            $(".shelf-element.main-view-element").addClass("disappeared");
            shelfIndex();
            $(".meepo-grand").find(".grand-element").remove();
            $(".meepo-desc").text('').show();
            $(".click-to-switch").addClass("click-to-render").removeClass("click-to-switch");
            $('.meepo-shelf').animate({'margin-top': shelfOffset},'fast');
            $('.shelf-element').animate({height:elementSize}, 'fast');
        }

        function pushSelectedElementDown(){
            if(transformMode === "toGrand"){
                $('.shelf-element.disappeared .ghost').animate({'height': elementSmallSize}, 500);
                $('.meepo-grand').animate({'height': grandHeight}, 800, pushMainElementIn);
            }else if(transformMode === "switch"){
                $('.shelf-element.disappeared').removeClass('disappeared');
                $('.shelf-element.to-switch').removeClass("to-switch").addClass("disappeared");
                renderGrand();

                $('.shelf-element.disappeared .ghost').animate({'height': elementSmallSize}, 500);
                $('.meepo-grand').animate({'height': grandHeight}, 800, pushMainElementIn);
            }
        };

        function pushGrandElementUp(){
            if(transformMode === "toMain"){
                $('.shelf-element.disappeared .ghost').animate({'height': '0px'}, 600);
                $('.meepo-grand').animate({'height': '0px'}, 600, shelfBack);
            }else if(transformMode === "switch"){
                var ghost = $('.shelf-element.disappeared').find('.ghost').animate({'height': '0px'}, 600);
                $('.meepo-grand').animate({'height': '0px'}, 600, pushSelectedElementDown);
            }

        };

        function pushMainElementIn(){
            $('.shelf-element.disappeared').animate({width: '0px', 'margin-left': '0px', 'margin-right': '0px'}, 'fast');
            $('.shelf-element.main-view-element').animate({width: elementSize, margin:elementMargin}, 'fast');
        };

        function pushMainElementOut(){
            $('.shelf-element.disappeared').animate({width: elementSize, 'margin-left': elementMargin, 'margin-right': elementMargin}, 'fast', pushGrandElementUp);
            $('.shelf-element.main-view-element').animate({width: '0', 'margin-left': '0px', 'margin-right': '0px'}, 'fast');
        };
	}
});