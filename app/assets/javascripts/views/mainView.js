define(['backbone', 'text!template/mainView_template.html', 'views/blogView', 'views/timelineView', 'views/gridView','views/meView'],function(Backbone, viewTemplate, blogView, timelineView, gridView, meView){
    var MainView = Backbone.View.extend({
        subViewList : [],
        events: {

        },
        initialize: function() {
            blogView.initialize();
            timelineView.initialize();
            gridView.initialize();
            meView.initialize();
            this.subViewList.push(blogView, timelineView, gridView, meView);
        },
        render: function(container) {
            this.$el = _.template(viewTemplate);
            $(container).append(this.$el);

            blogView.renderShelfElement($('.shelf'));
            timelineView.renderShelfElement($('.shelf'));
            gridView.renderShelfElement($('.shelf'));
            meView.renderShelfElement($('.shelf'));

            $('.main-view-element').addClass("disappeared");

            shelfIndex();
            menuSlider();

            $('.shelf-element').each(function(){
                $(this).click(transformToDetailView);
            });
        }
    });

    var transformToDetailView = function(){
       hideSlider();
       $('.element-desc').hide();
       var ghost = '<div class="ghost"></div>';
       $(this).addClass('disappeared').append($(ghost));
       $('.main-view-element').removeClass("disappeared");
       shelfIndex();
       renderGrand();
       $('.shelf').animate({'margin-top': '0'},'fast', pushDown);
       $('.shelf-element').animate({height:'40px'}, 'fast');
    };

    var renderGrand = function(){
        var viewName = $('.disappeared').attr('viewName');
        getSubViewByName(viewName).renderGrandElement('.grand');
    };

    var getSubViewByName = function(viewName){
        var view;

        for(var i =0; i<mainView.subViewList.length; i++){
             if(mainView.subViewList[i].viewName === viewName){
                 view = mainView.subViewList[i];
             }
        }

        return view;
    };

    var pushDown = function(){
        $('.disappeared .ghost').animate({'height': '40px'}, 500);
        $('.grand').animate({'height': '600px'}, 800, pushLeft);
    };

    var pushLeft = function(){
        $('.disappeared').animate({width: '0px', 'margin-left': '0px', 'margin-right': '0px'}, 'fast');
        $('.main-view-element').animate({width: '120px', margin:'15px'}, 'fast');
    };

    var shelfIndex = function(){
        $('.shelf-element:not(".disappeared")').each(function(idx){
            $(this).val(idx);
        });
    };

    var menuSlider = function(){
      $('.shelf-element').each(function(){
         $(this).hover(mouseIn, mouseOut);
      });
      $('.shelf').mouseleave(hideSlider);
    };

    var mouseIn = function(){
        var left = $(this).val() * 150 + 15;
        var color = $(this).css('background-color');
        var desc = $(this).children(".desc").text();
        $(".slider").css({height :'2px', backgroundColor: color}).animate({left:left}, "fast");
        $(".element-desc").text(desc);
    }

    var mouseOut = function(){
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
