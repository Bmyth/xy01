$.fn.extend({
	meepo: function(params, section, subsection, param){
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
        var homeFrontColor = params.homeFrontColor || defaultFrontColor;
        var homeBackColor = params.homeBackColor || defaultBackColor;

        if(!rendered()){
            render();
        }

        if(section){
            jumpTo(section);
        }

        function render(){
            $(meepoTemplate).appendTo(parent);

            parent.css('overflow','hidden');
            $(".meepo-shelf").css({width : size + elementMargin * 2, marginTop: shelfOffset,'margin-left': -(elementMargin)});
            $(".meepo-grand").css({width : grandWidth});
            $(".meepo-shelf .slider ").css("width", elementSize);

            renderShelf();

            var ghost = '<div class="ghost"></div>';
            $('.meepo-shelf .main-view-element').css({color:homeFrontColor, backgroundColor:"#437DD4", marginTop: elementMargin, marginBottom: elementMargin}).addClass("disappeared");
            $('.meepo-shelf .shelf-element:not(".main-view-element")').addClass('click-to-render').append($(ghost));
            $(".meepo-shelf .shelf-element .ghost").css("width", elementSize);

            shelfIndex();
            menuSlider();

            $('.shelf-element').live('click', function(){
                var section = $(this).find('span').text();
                $.kael('set', {status:'mainStatus', value:section, active:true, unique:true}, true);
            });
        };

        function renderSubsection(subsection){
//            assume the hiden one is section
            var idx = $(".shelf-element.disappeared").attr('eleIndex');
            params.elements[idx].render('.meepo-grand', subsection, param);
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
            var href = "";
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

        function transformToGrandView(ele){
            transformMode = "toGrand";
            hideSlider();
            $(".shelf-element.disappeared").removeClass("disappeared");
            $(ele).addClass('disappeared');
            shelfUp();
        };

        function transformToMainView(){
            transformMode = "toMain";
            hideSlider();
            pushMainElementOut();
        };

        function switchGrandView(ele){
            transformMode = "switch";
            hideSlider();
            $(ele).addClass('to-switch');
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
                }else if(params.elements[idx].render ){
                    params.elements[idx].render('.meepo-grand', subsection, param);
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
            $('.meepo-shelf').animate({'margin-top': '0'}, 600, pushSelectedElementDown);
            $('.meepo-shelf .shelf-element').animate({height:elementSmallSize}, 600);
        };

        function shelfBack(){
            $(".shelf-element.disappeared").removeClass("disappeared");
            $(".shelf-element.main-view-element").addClass("disappeared");
            shelfIndex();
            $(".meepo-grand").find(".grand-element").remove();
            $(".meepo-desc").text('').show();
            $(".click-to-switch").addClass("click-to-render").removeClass("click-to-switch");
            $('.meepo-shelf').animate({'margin-top': shelfOffset},600);
            $('.shelf-element').animate({height:elementSize}, 600);
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
            $(".meepo-shelf .shelf-element").each(function(){
                var elementSection = $(this).find("span").text();
                if(elementSection === section){
                    if(($(this).hasClass("disappeared"))){
                        if(section !== 'home'){
                            var idx = $(this).attr('eleindex');
                            params.elements[idx].render('.meepo-grand', subsection, param);
                        }
                    }else{
                        transform(this);
                    }
                    return false;
                }
            });
        };

        function transform(ele){
            if($(ele).hasClass('click-to-render')){
                transformToGrandView(ele);
            }else if($(ele).hasClass('click-to-switch')){
                switchGrandView(ele);
            }else{
                transformToMainView();
            }
        };

        function rendered(){
            if($(".meepo-shelf").get(0) && $(".meepo-grand").get(0)){
                return true;
            }else{
                return false;
            }
        };
	}
});