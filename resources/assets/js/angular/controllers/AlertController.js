app.controller('AlertController', function($scope, $http, API_URL, $rootScope) {
    //DELETE FRIEND Confirmed
    $rootScope.deleteFriendConfirmed = function() {
        $rootScope.postRequest($rootScope.friendDeleteData ,'deleteFriend', '');
        $rootScope.removeFriend($rootScope.chatID);
        $scope.Close();
    }

    // ADD FRIEND TO A GROUP
    $scope.addFriendToGroupAlert = function(chatID, friendID, chat_name, friends, friendName, chatindex) {        
        if(!friendID){
            friendID = $rootScope.friendID;
            // if add to chat
            $rootScope.groupsNotConfirmed.push($rootScope.groupsWithoutFriend[chatindex]);
            $rootScope.groupsWithoutFriend.splice(chatindex,1);
        }
        if(!chatID){
            chatID = $rootScope.chatID;
        }
        if(!chat_name){
            chat_name = $rootScope.chatname;
        }
        if(!friends){
            friends = $rootScope.groupFriends;
        }
        if(!friendName){
            friendName = $rootScope.chatname;
        }
        friends = $rootScope.ObjToArray(friends);
        var data = {
            user_id : friendID,
            chat_id : chatID,
            chatname : chat_name,
            friends : friends,
            name : friendName,
            confirmed : 0,
            is_deleted : 0,
            admin : 0
        };
        $rootScope.postRequest(data ,'addFriendToGroup', '');
        if($rootScope.FriendsNotInGroup){
            $rootScope.groupFriends.push(data);
            $rootScope.adjustObjectElement($rootScope.FriendsNotInGroup, friendID, 'userid', 'remove', 0, 0, 0, 0);
        }
        $rootScope.adjustArrayFromObject($rootScope.groups, [chatID, data], ['chat_id', 'friends'], 'update', 0, 0,1,0);
    }

    // LEAVE GROUPCHAT CONFIRMED
    $rootScope.LeaveGroupConfirm = function (){
        var data = {
            chatid      : $rootScope.chatID,
            friends     : $rootScope.groupFriends
        };
        $rootScope.removeGroup();
        $rootScope.postRequest(data ,'decline', '');
        $scope.Close();
    }

    // REVOKE FRIEND TO GROUP INVITE
    $rootScope.revokeInvite = function (friends, chatid, key){
        var data = {
            chatid      : chatid,
            userid      : $rootScope.toDeleteUserId,
            friends     : friends
        };
        $rootScope.groupsWithoutFriend.push($rootScope.groupsWithoutFriend[key]);
        $rootScope.groupsNotConfirmed.splice(key,1);        
        $rootScope.postRequest(data ,'decline', '');
        // $scope.Close();
    }

    // REVOKE FRIEND TO GROUP INVITE
    $rootScope.revokeInvitefromGroup = function (userid){
        var data = {
            chatid      : $rootScope.chatID,
            userid      : userid,
            friends     : $rootScope.groupFriends
        };
        $rootScope.postRequest(data ,'decline', '');
        // $scope.Close();
    }

    // REMOVE USER FROM GROUPCHAT CONFIRMED
    $rootScope.deleteUserFromGroupConfirm = function (){
        var data = {
            chatid      : $rootScope.chatID,
            userid      : $rootScope.toDeleteUserId,
            friends     : $rootScope.groupFriends
        };
        $rootScope.postRequest(data ,'decline', '');
        $scope.Close();
    }

    // DELETE GROUPCHAT CONFIRMED
    $rootScope.deleteGroupConfirm = function (){
        var data = {
            chatid      : $rootScope.chatID,
            friends     : $rootScope.groupFriends
        };
        $rootScope.postRequest(data ,'deleteGroup', '');
        $scope.Close();
    }

    //DELETE THEME
    $scope.deleteThemeConfirmed = function() {
        $rootScope.themes.splice([$rootScope.deleteTheme.index],1);
        $rootScope.postRequest($rootScope.deleteTheme ,'deleteTheme', '');
        $scope.Close();
    }

    //CLOSE ALERT
    $scope.Close = function() {
        $('#Alerts').removeClass('open');
        $('.alertbox').removeClass('open');
    }
})