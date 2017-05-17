app.controller('MessageController', function($scope, $http, API_URL, $rootScope, Messages) {
    $scope.message = {};
    $scope.message.theme = '1';
    $rootScope.makeBroadcastConnection = false;
    $rootScope.messagesLoaded = 0;

    //UPDATE CHAT
    $scope.successGetMessage = function(response) {
        // $rootScope.messages.items = response.data.messages;
        $rootScope.messagesLoaded = 0;
        $rootScope.messages = new Messages();
        $rootScope.messages.nextPage();
        $rootScope.themes = response.data.themes;
        $rootScope.generalThemeID = $rootScope.adjustElementNewArray($rootScope.themes, 1,'is_general', 'retreive',0,'id',0)[0];
        $scope.message.theme = $rootScope.generalThemeID;
        $scope.message.profileImage = response.data.profileImage;
        $scope.chatID = $rootScope.chatID;
        if ($rootScope.makeBroadcastConnection) {
            // If you are already in a chatroom. First leave this one. => than make a new broadcast connection.
            if($scope.currentChatroom){
                Echo.leave($scope.currentChatroom);
            }
            $rootScope.makeBroadcastConnection = false;
            $scope.broadcast($scope.chatID);
        }
        console.log($rootScope.themes ,$rootScope.messages.items);
    };

    $rootScope.updateChat = function(chatid) {
        $http.get(API_URL + "message" + "/" + chatid)
            .then($scope.successGetMessage, $rootScope.errorCallback);
    };

    //SEND A MESSAGE
    $scope.sendMessage = function(keyEvent) {
        if (keyEvent.which === 13 || keyEvent === 13) {
            $scope.message.chatid = $rootScope.chatID;
            // force theme message
            if($scope.message.filter){
                $scope.message.theme = $scope.message.filter
            }else{
                $scope.message.theme = $rootScope.generalThemeID;
            }
            var $textInput = $('#message-text');
            // if the text Input is not empty send the message
            if ($textInput.val() != "" && $rootScope.chatID) {
                $scope.message.text = $textInput.val();
                $textInput.val('');
                var url = API_URL + "message";

                $http({
                    method: 'POST',
                    url: url,
                    data: $.param($scope.message),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(function(response) {
                    $rootScope.postRequest($scope.chatfriends ,'newMessage', '');
                    $scope.scrollDown();
                }, $rootScope.errorCallback);
                $scope.message.text = null;
            }
        }
    };

    //BROADCAST CONNECTION
    $scope.broadcast = function(chatid) {
        $scope.currentChatroom = `chatroom.${chatid}`;
        console.log(`chatroom.${chatid}`);
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
                            $rootScope.removeThemeFromMessages(e.data.themeid);
                            $rootScope.updateThemeUsage(); //update Theme usage
                        }

                        if(e.event === 'update'){
                            var keywords = $rootScope.ObjToArray(e.data.keywords);
                            keywords = $rootScope.keywordToObjectArray(keywords);
                            e.data.keywords = keywords;
                            $rootScope.adjustObjectElement($rootScope.themes, e.data.id, 'id', 'remove', 0, 0, 0);
                            $rootScope.themes.push(e.data);
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

    $scope.messageColor = function(color) {
        $scope.message.color = color;
        $scope.scrollDown();
    }

    $scope.$on('$routeChangeStart', function() {
        Echo.leave($scope.currentChatroom);
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
    }

    Messages.prototype.nextPage = function() {
        if(this.busy) return;
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

