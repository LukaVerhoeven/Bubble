class AnimateWidthAuto {
    constructor() {
    	this.$get = $('.js-get-width');
        this.$reset = $('.js-reset-width');
    	this.$element = $('.js-auto-width');
        this.init();
    }

    init() {
       this.$get.on('click', () => {
        	this.setWidth();
       });
       this.$reset.on('click', (e) => {
            this.resetWidth(e);
       });       
    }

    setWidth() {
    	if(this.$element){
		    $.each(this.$element, function(index, value){
		    	var element = $(this);
		    	// when the element is loaded ( => give width )
                setTimeout(function(){ 
    					if(element.width() > 0){
    						// clearInterval(WaitForWidth);
							element.css('width', $(element).width() + 'px');
                            element.addClass('truncate');
    					}
                    //  var WaitForWidth = setInterval(function(){
        			// }, 250);
                }, 250);
		    	// clear interval after 3seconds
				// setTimeout(function(){ clearInterval(WaitForWidth); }, 3000);
		    })
    	}
    }

    resetWidth(e){
        var thisClass = this;
        setTimeout(function(){
            var auto = $(e.currentTarget).parents('.js-parent').find('.js-auto-width');
            auto.css('width', 'auto');
            thisClass.setWidth();
        }, 300);
    }
}

export default AnimateWidthAuto;