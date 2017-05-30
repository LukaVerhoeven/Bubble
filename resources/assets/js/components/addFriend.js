class addFriend {
    constructor() {
        // friend-tab
        this.$addfriend = $('.js-add-friend');
        this.$addfriendClose = '.close-add-friend';
        this.$bottom = $('.js-bottom-add');
        this.$bottomgroup = $('.js-bottom-group');
        this.$searchNewFriends = $('.js-search-new-friends');
        this.$friendrequest = '.js-send-friendrequest';
        this.$groupName = $('#createGroupsName');
        this.$friends = '.js-newGroupFriends';
        
        
        // group-tab
        this.$addgroup = $('.js-add-group');
        this.$tab = $('#sidebar .tab');

        this.init();
    }

    init() {
        // bottom-animation
    	this.$addfriend.on('click',()=>{
            this.$bottom.addClass('full');
            this.$bottomgroup.addClass('full');
            this.$addfriend.addClass('button-header').delay(300).queue(function(){
                $(this).addClass("delayed-properties").dequeue();
            });
    	})

        $(document).on('click',this.$addfriendClose, (e) => {
            var closeForm = true;
            if($(e.currentTarget).hasClass('js-creategroup')){
                closeForm = false;
                if(this.$groupName.val() && this.$bottomgroup.find(this.$friends).children().length) closeForm = true;
            }
            if(closeForm){
                if(this.$bottom.hasClass('full')){
                    this.$searchNewFriends.addClass('remove');
                    var searchbar =  this.$searchNewFriends;
                    setTimeout(function(){ searchbar.removeClass('remove');}, 800);
                }
                this.$bottom.removeClass('full');
                this.$bottomgroup.removeClass('full');
                this.$addfriend.removeClass('button-header').delay(300).queue(function(){
                    $(this).removeClass("delayed-properties").dequeue();
                });
            }
        });
 

        this.$tab.on('click',()=>{
            this.$bottom.removeClass('full');
            this.$bottomgroup.removeClass('full');
            this.$addfriend.removeClass('button-header').delay(300).queue(function(){
                $(this).removeClass("delayed-properties").dequeue();
            });
        })

        $(document).on('click',this.$friendrequest, (e) => {
            var target = $('i',e.currentTarget);
            var icon = target.html();
            if(icon === 'remove'){
                target.html('add');
                target.removeClass('red-text');
            }else if (icon === 'add') {
                target.html('remove');
                target.addClass('red-text');
            }
        });
    }
}

export default addFriend;