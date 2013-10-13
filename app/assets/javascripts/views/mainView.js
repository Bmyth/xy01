define(['backbone', 'text!template/mainView_template.html', 'views/blogView', 'views/timelineView', 'views/gridView','views/meView'],function(Backbone, viewTemplate, blogView, timelineView, gridView, meView){
    var MainView = Backbone.View.extend({
        subViewList : [],
        events: {

        },
        initialize: function() {
            this.template = _.template(viewTemplate);

            blogView.initialize();
            timelineView.initialize();
            gridView.initialize();
            meView.initialize();
            this.subViewList.push(blogView, timelineView, gridView, meView);
        },
        render: function(container) {
            var content =  this.template;
            $(container).append(content);

            blogView.renderShelfElement($('.shelf'));
            timelineView.renderShelfElement($('.shelf'));
            gridView.renderShelfElement($('.shelf'));
            meView.renderShelfElement($('.shelf'));

            var ghost = '<div class="ghost"></div>';
            $('.main-view-element').addClass("disappeared");
            $('.shelf-element:not(".main-view-element")').addClass('click-to-render').append($(ghost));

            shelfIndex();
            menuSlider();

            $('.shelf-element.click-to-render').live('click',transformToGrandView);
            $('.shelf-element.click-to-switch').live('click',switchGrandView);
            $('.main-view-element').click(transformToMainView);
        }
    });

    var transformMode = "";

    var transformToGrandView = function(){
       transformMode = "toGrand";
       hideSlider();
       $(".disappeared").removeClass("disappeared");
       $(this).addClass('disappeared');
       shelfUp();
    };

    var transformToMainView = function(){
        transformMode = "toMain";
        hideSlider();
        pushMainElementOut();
    };

    var switchGrandView = function(){
        transformMode = "switch";
        hideSlider();
        $(this).addClass('to-switch');
        pushMainElementOut();

    };

    var renderGrand = function(){
        $(".grand").find(".grand-element").remove();
        var viewName = $('.disappeared').attr('viewName');
        getSubViewByName(viewName).renderGrandElement('.grand');
    };

    var getSubViewByName = function(viewName){
        var view;

        for(var i =0; i< mainView.subViewList.length; i++){
             if(mainView.subViewList[i].viewName === viewName){
                 view = mainView.subViewList[i];
             }
        }
        return view;
    };

    var shelfUp = function(){
        $('.element-desc').hide();

        shelfIndex();
        renderGrand();

        $(".click-to-render").addClass("click-to-switch").removeClass("click-to-render");
        $('.shelf').animate({'margin-top': '0'},'fast', pushSelectedElementDown);
        $('.shelf-element').animate({height:'40px'}, 'fast');
    };

    var shelfBack = function(){
        $(".disappeared").removeClass("disappeared");
        $(".main-view-element").addClass("disappeared");
        shelfIndex();
        $(".grand").find(".grand-element").remove();
        $(".element-desc").text('').show();
        $(".click-to-switch").addClass("click-to-render").removeClass("click-to-switch");
        $('.shelf').animate({'margin-top': '300px'},'fast');
        $('.shelf-element').animate({height:'120px'}, 'fast');
    }

    var pushSelectedElementDown = function(){
        if(transformMode === "toGrand"){
            $('.disappeared .ghost').animate({'height': '40px'}, 500);
            $('.grand').animate({'height': '600px'}, 800, pushMainElementIn);
        }else if(transformMode === "switch"){
            $('.disappeared').removeClass('disappeared');
            $('.to-switch').removeClass("to-switch").addClass("disappeared");
            renderGrand();

            $('.disappeared .ghost').animate({'height': '40px'}, 500);
            $('.grand').animate({'height': '600px'}, 800, pushMainElementIn);
        }
    };

    var pushGrandElementUp = function(){
        if(transformMode === "toMain"){
            $('.disappeared .ghost').animate({'height': '0px'}, 600);
            $('.grand').animate({'height': '0px'}, 600, shelfBack);
        }else if(transformMode === "switch"){
            var ghost = $('.disappeared').find('.ghost').animate({'height': '0px'}, 600);
            $('.grand').animate({'height': '0px'}, 600, pushSelectedElementDown);
        }

    };

    var pushMainElementIn = function(){
        $('.disappeared').animate({width: '0px', 'margin-left': '0px', 'margin-right': '0px'}, 'fast');
        $('.main-view-element').animate({width: '120px', margin:'15px'}, 'fast');
    };

    var pushMainElementOut = function(){
        $('.disappeared').animate({width: '120px', 'margin-left': '15px', 'margin-right': '15px'}, 'fast', pushGrandElementUp);
        $('.main-view-element').animate({width: '0', 'margin-left': '0px', 'margin-right': '0px'}, 'fast');
    };

    var shelfIndex = function(){
        $('.shelf-element:not(".disappeared")').each(function(idx){
            $(this).val(idx);
        });
    };

    var menuSlider = function(){
      $('.shelf-element').each(function(){
         $(this).hover(mouseInShelfElement, mouseOutShelfElement);
      });
      $('.shelf').mouseleave(hideSlider);
    };

    var mouseInShelfElement = function(){
        var left = $(this).val() * 150 + 15;
        var color = $(this).css('background-color');
        var desc = $(this).children(".desc").text();
        $(".slider").css({height :'2px', backgroundColor: color}).animate({left:left}, "fast");
        $(".element-desc").text(desc);
    }

    var mouseOutShelfElement = function(){
        $(".slider").stop(true);
    }

    var hideSlider = function(){
        $('.element-desc').text('');
        $(".slider").css("height", "0");
    }

    var mainView = new MainView;

    var initialize = function(){
        mainView.initialize();
    };

    var render = function(container){
        mainView.render(container);
    };

    return {
        initialize : initialize,
        render : render
    };
})
