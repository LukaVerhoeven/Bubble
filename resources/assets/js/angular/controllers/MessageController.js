app.controller('MessageController', function($scope, $http, API_URL, $rootScope, Messages) {
    $rootScope.message = {};
    $rootScope.message.theme = '1';
    $rootScope.makeBroadcastConnection = false;
    $rootScope.messagesLoaded = 0;
    $scope.currentAmount = 1;

    //UPDATE CHAT
    $scope.successGetMessage = function(response) {
        // $rootScope.messages.items = response.data.messages;
        $rootScope.messagesLoaded = 0;
        $rootScope.messages = new Messages();
        $rootScope.messages.nextPage();
        // console.log($rootScope.messages);
        $rootScope.themes = response.data.themes;
        $rootScope.generalThemeID = $rootScope.adjustElementNewArray($rootScope.themes, 1,'is_general', 'retreive',0,'id',0)[0];
        $rootScope.message.theme = $rootScope.generalThemeID;
        $rootScope.message.profileImage = response.data.profileImage;
        $scope.chatID = $rootScope.chatID;
        if ($rootScope.makeBroadcastConnection) {
            // If you are already in a chatroom. First leave this one. => than make a new broadcast connection.
            if($scope.currentChatroom){
                Echo.leave($scope.currentChatroom);
            }
            $rootScope.makeBroadcastConnection = false;
            $scope.broadcast($scope.chatID);
        }
        // shortcuts
        $rootScope.initShortcut();
        // remove unread messages notifcation
        $scope.readmessages = {};
        $scope.readmessages.chatid = $rootScope.chatID;
        $scope.readmessages.userid = $rootScope.Authuserid;
        $rootScope.postRequest($scope.readmessages ,'readMessages', '');
        
        // remove loadscreen
        $("#load-content").removeClass('active');
    };

    $rootScope.updateChat = function(chatid) {
        $http.get(API_URL + "message" + "/" + chatid)
            .then($scope.successGetMessage, $rootScope.errorCallback);
    };

    //SEND A MESSAGE
    $scope.sendMessage = function(keyEvent) {
        if (keyEvent.which === 13 || keyEvent === 13) {
            $rootScope.message.chatid = $rootScope.chatID;
            // force theme message
            if($rootScope.message.filter){
                $rootScope.message.theme = $rootScope.message.filter
            }else{
                $rootScope.message.theme = $rootScope.generalThemeID;
            }
            var $textInput = $('#message-text');
            // if the text Input is not empty send the message
            if ($textInput.val() != "" && $rootScope.chatID) {
                $rootScope.message.text = $textInput.val();
                $textInput.val('');
                var url = API_URL + "message";

                $http({
                    method: 'POST',
                    url: url,
                    data: $.param($rootScope.message),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(function(response) {
                    $rootScope.postRequest($scope.chatfriends ,'newMessage', '');
                    $scope.scrollDown();
                }, $rootScope.errorCallback);
                $rootScope.message.text = null;
            }
        }
    };

    //BROADCAST CONNECTION
    $scope.broadcast = function(chatid) {
        $scope.currentChatroom = `chatroom.${chatid}`;
        // console.log(`chatroom.${chatid}`);
        // to retreive friends that are not in the chat
        $scope.chatfriends = {};
        $scope.chatfriends.chatid = chatid;
        if($rootScope.chatFunction === 'friendchat'){
            $scope.chatfriends.Ids = [$rootScope.friendID];
        }else if ($rootScope.chatFunction === 'groupschat') {
            $scope.chatfriends.Ids = $rootScope.adjustElementNewArray($rootScope.groupFriends, 0,'user_id', 'retreive',0,0,0);
        }
        $scope.scrollDown();
        Echo.join(`chatroom.${chatid}`)
            .here((users) => {
                $scope.chatfriends.active = $rootScope.adjustElementNewArray(users, 0,'id', 'retreive',0,0,0);
                $scope.chatfriends.NotActive = $scope.chatfriends.Ids.filter(function(e){return this.indexOf(e)<0;}, $scope.chatfriends.active);
            })
            .joining((user) => {
                $scope.chatfriends.active.push(user.id);
                $scope.chatfriends.NotActive = $scope.chatfriends.Ids.filter(function(e){return this.indexOf(e)<0;}, $scope.chatfriends.active);
            })
            .leaving((user) => {
                $scope.chatfriends.active = $scope.chatfriends.active.filter(function(e){return this.indexOf(e)<0;},[user.id]);
                $scope.chatfriends.NotActive = $scope.chatfriends.Ids.filter(function(e){return this.indexOf(e)<0;}, $scope.chatfriends.active);
            })
            .listen('UpdateChat', (e) => {
                $scope.$apply(function() {
                    var newMessage = {
                        text: e.message.text,
                        theme_id: e.message.theme_id,
                        name: e.user.name,
                        nickname: e.user.name,
                        user_id: e.message.user_id,
                        profile_image: e.message.profile_image,
                        force_theme: e.message.force_theme,
                        color: e.message.color,
                    }
                    $rootScope.messages.items = $rootScope.prependArray(newMessage, $rootScope.messages.items)
                    $scope.scrollDown();
                    $rootScope.updateThemeUsage(); //update Theme usage
                });
            })
            .listen('ProfileImage', (e) => {
                $scope.$apply(function() {
                    $rootScope.adjustObjectElement($rootScope.messages.items ,e.userid, 'user_id', 'edit', e.profileImage, 'profile_image', 0);
                });
            })
            .listen('EditUsername', (e) => {
                $scope.$apply(function() {
                    $rootScope.adjustArrayFromObject($rootScope.groups, e.userid, 'user_id', 'edit',e.newUsername, 'name', 0, 0);
                })
            })
            .listen('ThemeEvent', (e) => {
                $scope.$apply(function() {
                    if($rootScope.themes){
                        if(e.event === 'create'){
                            var keywords = $rootScope.ObjToArray(e.data.keywords);
                            keywords = $rootScope.keywordToObjectArray(e.data.keywords);
                            e.data.keywords = keywords;
                            $rootScope.themes.push(e.data);
                            $rootScope.updateMessages(keywords, e.data.color, e.data.id);
                            $rootScope.updateThemeUsage(); //update Theme usage

                        }

                        if(e.event === 'delete'){
                            $rootScope.adjustObjectElement($rootScope.themes, e.data, 'id', 'remove', 0, 0, 0);
                            $rootScope.removeThemeFromMessages(e.data);
                            $rootScope.updateThemeUsage(); //update Theme usage
                        }

                        if(e.event === 'update'){
                            var keywords = $rootScope.ObjToArray(e.data.keywords);

                            keywords = $rootScope.keywordToObjectArray(keywords);
                            e.data.keywords = keywords;
                            $rootScope.adjustObjectElement($rootScope.themes, e.data.id, 'id', 'update', e.data, 0, 0);
                            $rootScope.updateMessages(keywords, e.data.color, e.data.id);
                            $rootScope.updateThemeUsage(); //update Theme usage
                        }  

                        if(e.event === 'toggle'){
                            if(e.data.isActive){
                                var keywords = $rootScope.keywordToObjectArray(e.data.keywords);
                                $rootScope.updateMessages(keywords, e.data.color, e.data.themeid);
                            }else{
                                $rootScope.removeThemeFromMessages(e.data.themeid);
                            }
                            $rootScope.adjustObjectElement($rootScope.themes, e.data.themeid, 'id', 'edit', e.data.isActive, 'is_active', 0);
                            $rootScope.updateThemeUsage(); //update Theme usage
                        }
                        $rootScope.initShortcut();
                    }
                });
            });            
    };

    $rootScope.scrollDown = function() {
        var $chat = $('.chat');
        var $friend = $('.js-scrolldown');
        setTimeout(function() {
            $chat[0].scrollTop = $chat[0].scrollHeight;
        }, 1);
    };

    $rootScope.messageColor = function(color) {
        $rootScope.message.color = color;
        $scope.scrollDown();
        $scope.loadMessages();
        $('#scrollMessages').offset().top;
    }

    // !! TODO !! Danger !! can start to loads All messages ever send => really heavy => maak post call voor theme-messages->paginate()
    // Keep loading messages until you can scroll in the theme messages
    $scope.loadMessages = function(){
        if($('#scrollMessages').offset().top < 100){
            $rootScope.messages.nextPage();
            $rootScope.scrollDown();
            if($('#scrollMessages').offset().top < 100 && $rootScope.messages.itemAmount > $scope.currentAmount){
                $scope.currentAmount = $rootScope.messages.itemAmount;
                $scope.loadMessages();  
            } 
        }
    }

    // on refresh or url change => leave chat channel
    $scope.$on('$locationChangeStart', function() {
        Echo.leave($scope.currentChatroom);
        $rootScope.logout();
    });
    
    window.onbeforeunload = function(){
        $rootScope.logout();
        Echo.leave($scope.currentChatroom);
    }    

    $scope.$on('$locationChangeStart', function (event, next, current) {
        if (check(next+current)) {
             var answer = confirm("Are you sure you want to navigate away from this page");
           if (!answer) {
               event.preventDefault();
           }
        } 
    });

    // infinite scroll messages ↓↓↓↓ all code down below ↓↓↓↓ 
    $( "#scrollMessages" ).scroll(function() {
        if(this.scrollTop < 100){
            $scope.currentScrollHeight = this.scrollHeight;
            $rootScope.messages.nextPage();
        }
    });

    $rootScope.loadingScroll = function(color) {
        var $scroll = $("#scrollMessages")[0];
        setTimeout(function() {
            var scrolldifference= $scroll.scrollHeight-$scope.currentScrollHeight ;
            if(scrolldifference>0){
                $( "#scrollMessages" ).scrollTop(scrolldifference);
            }
        }, 1);
    }
})

// infinite scroll messages (retreive messages per block of pagination from laravel)
app.factory('Messages', function ($http, API_URL, $rootScope) {
    var Messages = function(){
        this.items = [];
        this.busy = false;
        this.page = 1;
        this.itemAmount = 1;
    }

    Messages.prototype.nextPage = function() {
        if(this.busy) return;
        if(this.items.length === this.itemAmount) return;
        this.busy = true;
        var url = API_URL + 'getMessages/'+ $rootScope.chatID +'?page='+this.page;
        $http.get(url).then(function(response){
            for (var i = 0; i < response.data.length; i++) {
                this.items.push(response.data[i]);
            };
            this.page++;
            this.busy = false;
            if(!$rootScope.messagesLoaded){
                $rootScope.scrollDown();
                $rootScope.messagesLoaded = 1;
            }else{
                $rootScope.loadingScroll();
            }
        }.bind(this));
        this.itemAmount = this.items.length;
    }
    
    return Messages;
});

app.filter('reverse', function() {
  return function(items) {
    if(items){
        return items.slice().reverse();
    }
  };
});

