app.controller('GlobalController', function($scope, $http, API_URL, $rootScope) {
    // GLOBAL FUNCTIONS
    // SORTS AN OBJECT BY PARAMETER
    $rootScope.sort_by = function (field, reverse, primer) {
        var key = primer ? 
        function(x) {return primer(x[field])} : 
        function(x) {return x[field]};

        reverse = !reverse ? 1 : -1;

        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        } 
    }

    // ERROR
    $rootScope.errorCallback = function(error) {
        // console.log(error);
        console.log("wrong call made");
    }

    //POST FUNCTION
    $rootScope.postRequest = function(data ,url ,responseAction) {
        var url = API_URL + url;
        $http({
                method: 'POST',
                url: url,
                data: $.param(data),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(function(response) {
                $scope.postResponse(responseAction);
            }, $rootScope.errorCallback);
    };

    // RESPONSE FUNCTION
    $rootScope.postResponse = function(responseAction) {
        // calls a function with the name 'responseAction' if this one exists
        if(angular.isFunction($scope[responseAction])){
            $scope[responseAction]();
        }
    };

    // REMOVE AN ELEMENT FROM AN OBJECT
    $rootScope.removeObjectElement = function(data, value) {
        data.forEach(function (obj, i) {
            for (var key in obj) {
                if(obj[key] == value){
                    console.log(i, data);
                    data.splice(i,1);
                }
            }
        });
    }

    // MULTICONTROLLER FUNCTIONS
    // ENTER A CHAT
    $rootScope.openChat = function(chatID, friendID, friendName, chatFunction, friends, userIsAdmin) {
        // Chat
        $rootScope.chatname = friendName;
        console.log($rootScope.chatname, friendName);
        $rootScope.chatID = chatID;
        $rootScope.friendID = friendID;
        // Settings
        $rootScope.chatFunction = chatFunction;
        $rootScope.groupFriends = friends;
        $rootScope.isChatAdmin = userIsAdmin;
    }

    // OPEN CHAT
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

        Echo.join(`user.${userid}`)
            .here((users) => {
                // this.usersInRoom = users;
            })
            .joining((user) => {
                // this.usersInRoom.push(user);
            })
            .leaving((user) => {
                // this.usersInRoom = this.usersInRoom.filter(u => u != user);
            })
            .listen('UserEvents', (e) => {
                 $scope.$apply(function() {
                    $rootScope.friendRequests.push(e.data);
                });
            });
    };



})