// import $ from 'jquery'; ==> npm library
// const $ = global.jQuery; 

class addFriend {
    constructor() {
        console.log('friend');
        this.$addfriend = $('.js-add-friend');
        this.$bottom = $('.js-bottom-add');
        this.$hidefriends = $('.js-hide-friends');
        this.$searchfriends = $('.js-search-friends');

        this.init();
    }

    init() {
    	this.$addfriend.on('click',()=>{
    		console.log('test');
    		this.$bottom.toggleClass('full');
    		this.$hidefriends.toggleClass('minimized');
    		this.$searchfriends.toggleClass('minimized');

    		//overflow scrollbar fix
    		if (this.$bottom.hasClass('overflow-delay')) {
    			setTimeout(()=>{
	    			this.$bottom.removeClass('overflow-delay')
	    			this.$searchfriends.removeClass('position-delay');
	    		}, 800); //=> moet gelijk zijn aan de transisition
    		}else {
    			setTimeout(()=>{
	    			this.$bottom.addClass('overflow-delay')
	    			this.$searchfriends.addClass('position-delay');
	    		}, 120);
    		}
    		

    	})
    }
}

export default addFriend;