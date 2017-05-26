class General {
    constructor() {
        this.init();
    }

    init() {
        // mobile sidebar
        $("#slide-out").sideNav();
        $(".button-collapse").sideNav();
   		$('.button-close-nav').sideNav({
		  menuWidth: 300, // Default is 240
		  closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
		}
	  );
    }
}

module.exports = General;