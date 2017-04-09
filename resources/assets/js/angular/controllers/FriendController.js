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
        // console.log($rootScope.friendlist);
        // An array with all your friends => for creating a new group => friends get removed from this array to the newGroup array. (GroupController)
        $rootScope.friendsForGroup = response.data.friends;
        // All your groups (GroupController)
        $rootScope.groups = response.data.groupchats;
    }

    $rootScope.getFriendChats = function() {
        $http.get(API_URL + "getChatRooms")
            .then($scope.friendList, $scope.errorCallback);
    }

    $scope.getFriendRequests = function() {
        $http.get(API_URL + "friendRequests")
            .then($scope.showRequests, $scope.errorCallback);
    }

    $scope.showRequests = function(response) {
        // console.log(response.data.friendrequests);
        $scope.friendRequests = response.data.friendrequests;
    }

    $scope.removeRequest = function(userid) {
       $scope.friendRequests.forEach(function (obj, i) {
            if(obj.user_id === userid){
                $scope.friendRequests.splice(i,1);
            }
        });
    }
     
    $rootScope.getFriendChats();
    $scope.getFriendRequests();

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
    $scope.addFriend = function(friendID,friendrequest) {
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
                if(friendrequest){
                    $scope.removeRequest(friendID);
                }
                if (response.data[0] === true) {
                    console.log(response.data[1]); // = friendship is confirmed
                    $rootScope.getFriendChats();
                }
            }, $scope.errorCallback);
    }

    //DECLINE FRIENDREQUEST
    $scope.decline = function(friendID) {
        var newfriend = {
            newfriend: friendID
        };
        var url = API_URL + "declineFriend";
        $http({
                method: 'POST',
                url: url,
                data: $.param(newfriend),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(function(response) {
                $scope.removeRequest(friendID);
            }, $scope.errorCallback);
    }
})