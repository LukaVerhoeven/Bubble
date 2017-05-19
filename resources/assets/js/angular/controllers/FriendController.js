app.controller('FriendController', function($scope, $http, $sanitize, API_URL, $rootScope) {

    $scope.newFriendInput = '';

    // GET FRIENDLIST AND GROUPCHATS
    $scope.friendList = function(response) {
        // All your friends
        // console.log(response.data);
        $rootScope.friendlist = response.data.friends;
        // An array with all your friends => for creating a new group => friends get removed from this array to the newGroup array. (GroupController)
        $rootScope.friendsForGroup = response.data.friends;
        // All your groups (GroupController)
        $rootScope.groups = response.data.groupchats;
        console.log($rootScope.friendlist, $rootScope.groups);
        // make User-broadcast connection
        $rootScope.Authuserid = response.data.userid;
        $rootScope.broadcastUser($rootScope.Authuserid);
        // broadcast loginstate
        $scope.loginBroadcast();
    }

    $rootScope.getFriendChats = function() {
        $http.get(API_URL + "getChatRooms")
            .then($scope.friendList, $rootScope.errorCallback);
    }

    $scope.getFriendRequests = function() {
        $http.get(API_URL + "friendRequests")
            .then($scope.showRequests, $rootScope.errorCallback);
    }

    $scope.showRequests = function(response) {
        $rootScope.friendRequests = response.data.friendrequests;
        console.log($rootScope.friendRequests);
    }

    $scope.removeRequest = function(userid) {
        $rootScope.friendRequests.forEach(function (obj, i) {
            if(obj.user_id === userid){
                $rootScope.friendRequests.splice(i,1);
            }
        });
    }
     
    $rootScope.getFriendChats();
    $scope.getFriendRequests();

    // SEARCH NEW FRIENDS
    $scope.newfriendsearch = function(response) {
        $scope.searchedfriends = response.data;
        // console.log($scope.searchedfriends);
    }

    // TODO: keypress api request--> te belastent voor de server? database?
    $scope.updateFriendSearch = function(letters) {
        //TODO: don't display blocked user ( migrate database )
        $validate = $sanitize(letters)
        $http.get(API_URL + "searchNewFriend/" + $validate)
            .then($scope.newfriendsearch, $rootScope.errorCallback);
    }

    // ADD NEW FRIEND
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
                    $rootScope.addFriend(response.data);
                }
            }, $rootScope.errorCallback);
    }

    // DECLINE FRIENDREQUEST
    $scope.decline = function(friendID) {
        var friendID = {
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
            }, $rootScope.errorCallback);
    }

    //DELETE FRIEND
    $rootScope.deleteFriend = function() {
        var data = {
            newfriend : $rootScope.friendID,
            chatID : $rootScope.chatID
        };
        // open the alert to confirm the delete
        $rootScope.friendDeleteData = data;
        $('#Alerts').addClass('open');
        $('#DeleteFriendAlert').addClass('open');
    }

    // REMOVE FRIEND FROM FRIENDLIST (visualy) called when allert is confirmed
    $rootScope.removeFriend = function(chatid) {
         $rootScope.adjustObjectElement($rootScope.friendlist, chatid,'chatid', 'remove',1,0,0);
         if($rootScope.chatID == chatid){
            $rootScope.resetChat();
         }
    }

    // ADD FRIEND TO FRIENDLIST (visualy) called when allert is confirmed
    $rootScope.addFriend = function(user) {
        $rootScope.friendlist.push(user)
    }

    // ONLINE STATES
    $scope.loginBroadcast = function(){
        $scope.onlinestate = {};
        $scope.onlinestate.authid = $rootScope.Authuserid;
        $scope.onlinestate.friendids = $rootScope.adjustElementNewArray($rootScope.friendlist , 0,'userid', 'retreive',0,0,0);
        if($scope.onlinestate.friendids.length>0){
            $rootScope.postRequest($scope.onlinestate ,'onlineState', '');
        }
    }
})