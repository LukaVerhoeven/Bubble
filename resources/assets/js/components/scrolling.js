class Scrolling {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('scroll', function(e){ 
            var target = $(e.target);
            if (target.is(':hover')) {
                target.addClass("scolling");
            }
           clearTimeout($.data(this, 'scrollTimer'));
            $.data(this, 'scrollTimer', setTimeout(function() {
                $(e.target).removeClass("scolling");
            }, 500));
        },true);
       
    }
}

export default Scrolling;