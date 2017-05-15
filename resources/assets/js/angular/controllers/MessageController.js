app.controller('MessageController', function($scope, $http, API_URL, $rootScope) {
    $scope.message = {};
    $scope.message.theme = '1';
    $rootScope.makeBroadcastConnection = false;

    //UPDATE CHAT
    $scope.successGetMessage = function(response) {
        $rootScope.messages = response.data.messages;
        $rootScope.themes = response.data.themes;
        $rootScope.generalThemeID = $rootScope.adjustElementNewArray($rootScope.themes, 1,'is_general', 'retreive',0,'id',0)[0];
        console.log($rootScope.themes ,$rootScope.messages);
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
    };

    $rootScope.updateChat = function(chatid) {
        console.log(chatid);
        $http.get(API_URL + "message" + "/" + chatid)
            .then($scope.successGetMessage, $rootScope.errorCallback);
    };

    //SEND A MESSAGE
    $scope.sendMessage = function(keyEvent) {
        if (keyEvent.which === 13) {
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
                    $scope.scrollDown();
                }, $rootScope.errorCallback);
            }
        }
    };

    //BROADCAST CONNECTION
    $scope.broadcast = function(chatid) {
        $scope.currentChatroom = `chatroom.${chatid}`;
        console.log(`chatroom.${chatid}`);

        $scope.scrollDown();
        Echo.join(`chatroom.${chatid}`)
            .here((users) => {
                // console.log(users);
                // this.usersInRoom = users;
            })
            .joining((user) => {
                // console.log(user);
                // this.usersInRoom.push(user);
            })
            .leaving((user) => {
                // console.log(user);
                // this.usersInRoom = this.usersInRoom.filter(u => u != user);
            })
            .listen('UpdateChat', (e) => {
                $scope.$apply(function() {
                    $rootScope.messages.push({
                        text: e.message.text,
                        theme_id: e.message.theme_id,
                        name: e.user.name,
                        user_id: e.message.user_id,
                        profile_image: e.message.profile_image,
                        force_theme: e.message.force_theme,
                        color: e.message.color,
                    });
                    console.log($rootScope.messages);
                    $rootScope.updateThemeUsage(); //update Theme usage
                });
            })
            .listen('ProfileImage', (e) => {
                $scope.$apply(function() {
                    $rootScope.adjustObjectElement($rootScope.messages ,e.userid, 'user_id', 'edit', e.profileImage, 'profile_image', 0);
                });
            })
            .listen('ThemeEvent', (e) => {
                $scope.$apply(function() {
                    if($rootScope.themes){
                        console.log(e);
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

    $scope.scrollDown = function() {
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
}) 