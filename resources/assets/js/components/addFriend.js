class addFriend {
    constructor() {
        // friend-tab
        this.$addfriend = $('.js-add-friend');
        this.$bottom = $('.js-bottom-add');
        this.$hidefriends = $('.js-hide-friends');
        // group-tab
        this.$addgroup = $('.js-add-group');
        this.$bottomgroup = $('.js-bottom-group');
        this.$hidegroups = $('.js-hide-groups');

        this.init();
    }

    init() {
        // friend-animation
    	this.$addfriend.on('click',()=>{
    		this.$bottom.toggleClass('full');
    		this.$hidefriends.toggleClass('minimized');
    	})
        // group animation
        this.$addgroup.on('click',()=>{
            this.$bottomgroup.toggleClass('full');
            this.$hidegroups.toggleClass('minimized');
        })
    }
}

export default addFriend;