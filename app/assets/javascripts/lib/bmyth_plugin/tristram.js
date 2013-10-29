$.fn.extend({
    tristram: function(params){
        var parent = $(this);
        parent.css({
            width : 185
        });

        var tristramTemplate = "<div class='tristram-container'>" +
                                    "<div class='tri-element te1' num=1><img src='assets/tristram/1white.png'></div>" +
                                    "<div class='tri-element te2' num=2><img src='assets/tristram/2white.png'></div>" +
                                    "<div class='tri-element te3' num=3><img src='assets/tristram/3white.png'></div>" +
                                    "<div class='tri-element te4' num=4><img src='assets/tristram/4white.png'></div>" +
                                    "<div class='tri-element te5' num=5><img src='assets/tristram/5white.png'></div>" +
                                    "<div class='tri-element te6' num=6><img src='assets/tristram/6white.png'></div>" +
                                    "<div class='tri-element te7' num=7><img src='assets/tristram/7white.png'></div>" +
                                    "<div class='tri-element te8' num=8><img src='assets/tristram/8white.png'></div>" +
                                    "<div class='tri-login'></div>" +
                                "</div>";

        var tristram = $(".tristram-container").get(0) || $(tristramTemplate).appendTo(parent).get(0);
        tristram = $(tristram).css({
            width: 185,
            height: 120,
            top: -84
        });

        var spell = "";

        var password = "142857";

        var open = $.cookie('logged-in') === 'yes' ? true : false;
        var text = $.cookie('logged-in') === 'yes' ? 'open' : 'log in';
        $('.tri-login').text(text);

        tristram.hover(function(){
            if(!open){
                tristram.animate({top:0},'slow');
            }
        },function(){
            spell = "";
            tristram.animate({top: -84}, 1000);
            $(this).find(".actived").removeClass("actived");
        });

        $(".tristram-container .tri-element").click(function(){
            if($(this).hasClass('actived')){
                return;
            }

            var dig = $(this).attr('num');
            spell = spell + dig;

            if(spell === password){
//                var spellArray = spell.split("");
//                spellArray.reverse();
//                while(spellArray.length > 0){
//                    var s = spellArray.shift();
//                    var matchStr = ".avtived[num=" + s + "]";
//                }
                open = true;
                $(".tri-login").text("open");
                $.cookie('logged-in','yes');
                tristram.animate({top: -84});

            }else{
                $(this).addClass('actived');
            }
        });

	}
});