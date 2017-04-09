app.controller('MessageController', function($scope, $http, API_URL, $rootScope) {
    $scope.message = {};
    $scope.message.theme = '1';
    $scope.makeBroadcastConnection = false;

    //ERROR
    $scope.errorCallback = function(error) {
        // console.log(error);
        console.log("wrong call made");
    }

    //UPDATE CHAT
    $scope.successGetMessage = function(response) {
        $scope.messages = response.data.messages;
        $scope.message.themes = response.data.themes;
        $scope.message.theme = response.data.themes[0].id;
        $scope.chatID = $rootScope.chatID;
        
        if ($scope.makeBroadcastConnection) {
            $scope.makeBroadcastConnection = false;
            $scope.broadcast($scope.chatID);
        }
    }

    $scope.update = function($id) {
        $http.get(API_URL + "message" + "/" + $id)
            .then($scope.successGetMessage, $scope.errorCallback);
    }

    //SEND A MESSAGE
    $scope.sendMessage = function(keyEvent) {
        if (keyEvent.which === 13) {
            var $textInput = $('#message-text');
            // if the text Input is not empty send the message
            if ($textInput.val() != "" && $rootScope.chatID) {
                $textInput.val('');
                //TODO: werkt alleen met rootscope nu. is het niet beter dat het met scope.chatID werkt? Anders verwijder regel 17?
                var url = API_URL + "message/" + $rootScope.chatID;

                $http({
                    method: 'POST',
                    url: url,
                    data: $.param($scope.message),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(function(response) {
                    $scope.scrollDown();
                }, $scope.errorCallback);
            }
        }
    }

    //OPEN CHAT
    $rootScope.$watch(function() {
        return $rootScope.chatID;
    }, function() {
        if ($rootScope.chatID) {
            $scope.makeBroadcastConnection = true;
            $scope.update($rootScope.chatID);
        }
    }, true);

    //BROADCAST CONNECTION
    $scope.broadcast = function(chatid) {
        var chatroom = 'chatroom.' + chatid;
        console.log(`chatroom.${chatid}`);
        console.log(Echo)

        $scope.scrollDown();
        Echo.join(`chatroom.${chatid}`)
            .here((users) => {
                console.log(users);
                // this.usersInRoom = users;
            })
            .joining((user) => {
                console.log(user);
                // this.usersInRoom.push(user);
            })
            .leaving((user) => {
                console.log(user);
                // this.usersInRoom = this.usersInRoom.filter(u => u != user);
            })
            .listen('UpdateChat', (e) => {
                console.log(e);
                $scope.$apply(function() {
                    $scope.messages.push({
                        text: e.message.text,
                        theme_id: e.message.theme
                    });
                });
            });
    };

    $scope.scrollDown = function(chatid) {
        var $chat = $('.chat');
        var $friend = $('.js-scrolldown');
        setTimeout(function() {
            $chat[0].scrollTop = $chat[0].scrollHeight;
        }, 1);
    };
})