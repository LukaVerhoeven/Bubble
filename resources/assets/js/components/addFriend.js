// import $ from 'jquery'; ==> npm library
// const $ = global.jQuery; 

class addFriend {
    constructor() {
        this.$addfriend = $('.js-add-friend');
        this.$bottom = $('.js-bottom-add');
        this.$hidefriends = $('.js-hide-friends');

        this.init();
    }

    init() {
    	this.$addfriend.on('click',()=>{
    		this.$bottom.toggleClass('full');
    		this.$hidefriends.toggleClass('minimized');
    	})
    }
}

export default addFriend;