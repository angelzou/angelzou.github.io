/**
 * Created by angelzou on 2015/7/6.
 */
;(function(){
    var $el = $("<div class='T-back-top hidden'><i class='arrow-up'></i></div>")
                .appendTo($("body")).click(function(){
                $("html, body").animate({scrollTop: 0}, 200);   
            }),
        backToTop = function(){
            var st = $(document).scrollTop();
            st > 0 ? $el.show() : $el.hide();
        };
    $(window).bind("scroll", backToTop);
    $(function(){
        backToTop();
    });
})();
