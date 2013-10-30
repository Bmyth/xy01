$.fn.extend({
	meepo: function(params){
        var parent = $(this);
        var transformMode = "";

        var size = params.size || 600;
        var grandWidth = params.grandWidth || size;
        var grandHeight = params.grandHeight || size;


        var defaultShelfOffset = 300;
        var elementNumber = getElementNumber();
        var elementSize = params.elementSize || size/elementNumber * 0.9;
        var elementMargin = params.elementMargin || (size - elementNumber * elementSize) / (elementNumber - 1 ) * 0.5;
        var elementOffset = elementSize + elementMargin * 2;

        var defaultFrontColor = "#ffffff";
        var defaultBackColor = "#cccccc";
        var defaultTitle = "element title";
        var defaultDesc = "element description";
        var defaultMenuHeight = 20;

        var meepoTemplate = "<div class='meepo-shelf'>" +
            "<div class='slider'></div>" +
            "<div class='main-view-element shelf-element' href='#home'>" +
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
        var homeFrontColor = params.homeFrontColor || defaultFrontColor;
        var homeBackColor = params.homeBackColor || defaultBackColor;

        if(!rendered()){
            render();
        }

        if(typeof params === "string"){
            jumpTo(params);
        }

        function render(){
            $(meepoTemplate).appendTo(parent);

            parent.css('overflow','hidden');
            $(".meepo-shelf").css({width : size + elementMargin * 2, marginTop: shelfOffset,'margin-left': -(elementMargin)});
            $(".meepo-grand").css({width : grandWidth});
            $(".meepo-shelf .slider ").css("width", elementSize);

            renderShelf();

            var ghost = '<div class="ghost"></div>';
            $('.meepo-shelf .main-view-element').css({color:homeFrontColor, backgroundColor:homeBackColor, marginTop: elementMargin, marginBottom: elementMargin}).addClass("disappeared");
            $('.meepo-shelf .shelf-element:not(".main-view-element")').addClass('click-to-render').append($(ghost));
            $(".meepo-shelf .shelf-element .ghost").css("width", elementSize);

            shelfIndex();
            menuSlider();

            $('.shelf-element.click-to-render').live('click',transformToGrandView);
            $('.shelf-element.click-to-switch').live('click',switchGrandView);
            $('.main-view-element').click(transformToMainView);
        };

        function renderShelf(){
            if(params.elements){
                for(var i = 0; i < params.elements.length; i++){
                    renderShelfElement(params.elements[i], i);
                }
            }
        }

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
            var href = "/#" + ele.title || defaultTitle;
            if(ele.shelfElement){
                $(ele.shelfElement).css({
                    'float':'left',
                    'height':elementSize,
                    'width':elementSize,
                    'margin':elementMargin,
                    'color': frontColor,
                    'backgroundColor': backColor
                }).addClass("shelf-element").attr('href',href).appendTo(shelfContainer);
            }else if(ele.renderShelf){
                $(ele.rendShelf()).attr('href',href);
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
                }).attr('eleIndex',idx).attr('href',href);
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
                        'width':grandWidth,
                        'color': frontColor,
                        'backgroundColor': backColor
                    }).addClass("grand-element").appendTo($('.meepo-grand'));
                }else if(params.elements[idx].render){
                    params.elements[idx].render('.meepo-grand');
                }else{
                    $(grandElementTemplate).css({
                        'height':grandHeight,
                        'width':grandWidth,
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
            $('.meepo-shelf .shelf-element').animate({height:elementSmallSize}, 'fast');
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

            if(params.backHomeEvent){
                params.backHomeEvent();
            }
        }

        function pushSelectedElementDown(){
            if(transformMode === "toGrand"){
                $('.shelf-element.disappeared .ghost').animate({'height': elementSmallSize}, 800);
                $('.meepo-grand').animate({'height': grandHeight}, 800, pushMainElementIn);
            }else if(transformMode === "switch"){
                $('.shelf-element.disappeared').removeClass('disappeared');
                $('.shelf-element.to-switch').removeClass("to-switch").addClass("disappeared");
                shelfIndex();
                renderGrand();

                $('.shelf-element.disappeared .ghost').animate({'height': elementSmallSize}, 800);
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
            $('.shelf-element.main-view-element').animate({width: elementSize, marginLeft:elementMargin, marginRight:elementMargin}, 'fast');
        };

        function pushMainElementOut(){
            $('.shelf-element.disappeared').animate({width: elementSize, 'margin-left': elementMargin, 'margin-right': elementMargin}, 'fast', pushGrandElementUp);
            $('.shelf-element.main-view-element').animate({width: '0', 'margin-left': '0px', 'margin-right': '0px'}, 'fast');
        };


        function jumpTo(section){
            if(section === 'home'){
                $('.main-view-element').click();
                return ;
            }

            $(".meepo-shelf .shelf-element").each(function(){
                if($(this).find("span").text() === section){
                    $(this).click();
                    return false;
                }
            });
        };

        function rendered(){
            if($(".meepo-shelf").get(0) && $(".meepo-grand").get(0)){
                return true;
            }else{
                return false;
            }
        }
	}
});