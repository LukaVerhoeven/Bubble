var app = angular.module('bubble',['ngSanitize'])
        .constant('API_URL','http://bubble.local/api/')

app.controller('GlobalController', function($scope, $http, API_URL, $rootScope) {

    //SORTS AN OBJECT BY PARAMETER
    $rootScope.sort_by = function (field, reverse, primer) {
        var key = primer ? 
        function(x) {return primer(x[field])} : 
        function(x) {return x[field]};

        reverse = !reverse ? 1 : -1;

        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        } 
    }

    //ENTER A CHAT
    $rootScope.openChat = function(chatID, friendName) {
        $rootScope.chatname = friendName;
        $rootScope.chatID = chatID;
    }
})
app.controller('FriendController', function($scope, $http, $sanitize, API_URL, $rootScope) {

    $scope.newFriendInput = '';

    //ERROR
    $scope.errorCallback = function(error) {
        // console.log(error);
        console.log("wrong call made");
    }

    //GET FRIENDLIST
    $scope.friendList = function(response) {
        //All your friends
        $rootScope.friendlist = response.data.friends;
        // An array with all your friends => for creating a new group => friends get removed from this array to the newGroup array. (GroupController)
        $rootScope.friendsForGroup = response.data.friends;
        // All your groups (GroupController)
        $rootScope.groups = response.data.groupchats;
        // TODO SORT this in backend
        $rootScope.groups.sort($rootScope.sort_by('chat_name', false, function(a){return a.toUpperCase()}));
    }

    $scope.getFriendChats = function() {
        $http.get(API_URL + "getChatRooms")
            .then($scope.friendList, $scope.errorCallback);
    }

    $scope.getFriendChats();

    //SEARCH NEW FRIENDS
    $scope.newfriendsearch = function(response) {
        $scope.searchedfriends = response.data;
        // console.log($scope.searchedfriends);
    }

    //TODO: keypress api request--> te belastent voor de server? database?
    $scope.updateFriendSearch = function(letters) {
        //TODO: don't display blocked user ( migrate database )
        $validate = $sanitize(letters)
        $http.get(API_URL + "searchNewFriend/" + $validate)
            .then($scope.newfriendsearch, $scope.errorCallback);
    }

    //ADD NEW FRIEND
    $scope.addFriend = function(friendID) {
        var newfriend = {
            newfriend: friendID
        };
        var url = API_URL + "addFriend";
        $http({
                method: 'POST',
                url: url,
                data: $.param(newfriend),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(function(response) {
                if (response.data[0] === true) {
                    console.log(response.data[1]); // = friendship is confirmed
                    $scope.getFriendChats();
                }
            }, $scope.errorCallback);
    }


})
app.controller('GroupController', function($scope, $http,$sanitize, API_URL, $rootScope) {

    $scope.newGroup = {};
    $scope.newGroup.friends = [];

    //ERROR
    $scope.errorCallback = function(error) {
        // console.log(error)
        console.log("wrong call made");
    }

    //ADD AND REMOVE FRIENDS TO THE NEW GROUP
    $scope.toggleFriendToGroup = function(id, array, arrayToAdd){
        array.forEach(function (obj, i) {
            if(obj.chatid === id){
                array.splice(i,1);
                arrayToAdd.push(obj);
            }
        });
        arrayToAdd.sort($rootScope.sort_by('name', false, function(a){return a.toUpperCase()}));
    }

    // CREATES A GROUP
    $scope.createGroup = function(){
        var url = API_URL + "createGroup";
        $scope.newGroup.chatname = $sanitize($scope.newGroup.chatname)
        $http({
            method: 'POST',
            url: url,
            data: $.param($scope.newGroup),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(response) {

        }, $scope.errorCallback);
    }

    //ACCEPT GROUP INVITE
    $scope.accept = function (chatid) {
        var url = API_URL + "accept";
        $http({
            method: 'POST',
            url: url,
            data: $.param({chatid : chatid}) ,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(function(response) {
            
        }, $scope.errorCallback);
        $scope.update(chatid, true);
    }

    //DECLINE GROUP INVITE
    $scope.decline = function (chatid) {
        var url = API_URL + "decline";
        $http({
            method: 'POST',
            url: url,
            data: $.param({chatid : chatid}) ,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(function(response) {
            
        }, $scope.errorCallback);
        $scope.update(chatid, false);
    }

    // LIVE UPDATE GROUPS
    $scope.update = function (id , accept) {
        if (accept) {
            $rootScope.groups.forEach(function (obj, i) {
                console.log(obj.chat_id , id);
                if(obj.chat_id === id){
                    console.log(obj);
                    obj.confirmed = 1;
                    console.log(obj);
                }
            });
            $rootScope.groups.sort($rootScope.sort_by('chat_name', false, function(a){return a.toUpperCase()}));
        }else {
            $rootScope.groups.forEach(function (obj, i) {
                console.log(obj.chat_id , id);
                if(obj.chat_id === id){
                    console.log(obj);
                    $rootScope.groups.splice(i,1);
                    console.log(obj);
                }
            });
        }
    }
})
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
app.controller('NavController', function($scope, $http, API_URL, $rootScope) {

	$scope.$watch(function() {
		return $rootScope.chatname;
	}, function() {
		if ($rootScope.chatname) {
			$scope.chatname = $rootScope.chatname;
		} else {
			$scope.chatname = 'chat';
		}
	}, true);

})