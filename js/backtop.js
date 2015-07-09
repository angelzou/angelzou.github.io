/**
 * Created by angelzou on 2015/7/6.
 */
;(function(){
    var Top = function(){
        this.tpl = "<div class='T-back-top hidden'><i class='arrow-up'></i></div>";
        this._init();
    };
    Top.prototype = {
        _init: function() {
            var that = this;
            $("body").append(this.tpl);
            if(that.getScrollY() > 100) {
                that.backToTop();
            }
            $(window).scroll(function(){
                that.backToTop();
                if(that.getScrollY() <= 100) {
                    $(".T-back-top").addClass('hidden');
                }
            });
        },
        backToTop: function() {
            if($(".T-back-top").get(0)) {
                $(".T-back-top").removeClass('hidden');
            } else {
                $(body).append(this.tpl);
                $(".T-back-top").removeClass('hidden');
            }
            $(".T-back-top").click(function(){
                $(".T-back-top").addClass('hidden');
                document.documentElement.scrollTop = document.body.scrollTop = 0;
            });
        },
        getScrollY: function(){
            //console.log(document.documentElement.scrollTop || document.body.scrollTop);
            return document.documentElement.scrollTop || document.body.scrollTop;
        }
    };

    var top = new Top();
})();
