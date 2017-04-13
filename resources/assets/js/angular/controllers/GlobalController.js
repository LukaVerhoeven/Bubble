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

    //OPEN CHAT
    $rootScope.$watch(function() {
        return $rootScope.chatID;
    }, function() {
        if ($rootScope.chatID) {
            $rootScope.makeBroadcastConnection = true;
            $rootScope.updateChat($rootScope.chatID);
        }
    }, true);

    // Make a broadcast connection for the user to create Real-time action. (ex. friendrequest)
    $rootScope.broadcastUser = function(userid) {
        console.log(`user.${userid}`);

        Echo.join(`user.${userid}`)
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
            .listen('UserEvents', (e) => {
                console.log(e);
                $scope.$apply(function() {
                    $rootScope.friendRequests.push(e.data);
                });
            });
    };
})