class Scrolling {
    constructor() {
        this.init();
    }

    init() {
        console.log('scroll');
        document.addEventListener('scroll', function(e){ 
            var target = $(e.target);
            if (target.is(':hover')) {
                target.addClass("scolling");
            }
           clearTimeout($.data(this, 'scrollTimer'));
            $.data(this, 'scrollTimer', setTimeout(function() {
                $(e.target).removeClass("scolling");
            }, 250));
        },true);
       
    }
}

export default Scrolling;