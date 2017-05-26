class General {
    constructor() {
        this.init();
    }

    init() {
        // mobile sidebar
        $("#slide-out").sideNav();
        $(".button-collapse").sideNav();
       	$(document).on('click','.button-close-nav', () => {
  			$(".drag-target").trigger("click");
		    console.log($(".drag-target"));
		    return false;
        });		
    }
}

module.exports = General;