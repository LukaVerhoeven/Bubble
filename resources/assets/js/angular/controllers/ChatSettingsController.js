app.controller('ChatSettingsController', function($scope, $http, $sanitize, API_URL, $rootScope) {
    // ADD FRIEND TO NEW GROUP (Send to alert)
    $scope.addFriendToGroup = function() {
        // get the groups were you'r friend isn't already in
        $rootScope.groupsWithoutFriend = $rootScope.adjustArrayElementNewArray($rootScope.groups, $rootScope.friendID, 'user_id', 'remove',1,0,0,0);
        // TODO deze retreive is  slecht geschrven
        $rootScope.groupsNotConfirmed = $rootScope.adjustArrayElementNewArray($rootScope.groups, [$rootScope.friendID, 0], ['user_id', 'confirmed'], 'retreive',0,0,0,1);
        $rootScope.toDeleteUserId = $rootScope.friendID;

        // send data to alert
        $('#Alerts').addClass('open');
        $('#addFriendToGroupAlert').addClass('open');
    }

    // INVITE FRIEND TO GROUP
    $scope.inviteFriendToGroup = function() {
        // get the groups were you'r friend isn't already in
        var friendIdsInGroup = $rootScope.adjustElementNewArray($rootScope.groupFriends, 0,'user_id', 'retreive',0,0,0);
        $rootScope.FriendsNotInGroup = $rootScope.adjustElementNewArray($rootScope.friendlist, friendIdsInGroup , 'userid', 'remove',0,0,1);
        // send data to alert
        $('#Alerts').addClass('open');
        $('#inviteFriendToGroupAlert').addClass('open');
    }

    // LEAVE GROUP (Send to alert)
    $scope.LeaveGroup = function() {
        // open alert
        var blockAction = $scope.minimumAdmins(false);
        if(!blockAction){
            $('#Alerts').addClass('open');
            $('#LeaveGroupschatAlert').addClass('open');
        }
    }

    // ADD FRIEND TO NEW GROUP (Send to alert)
    $scope.toggleAdmin = function(becomeAdmin, userid, key) {
        becomeAdmin = 1 - becomeAdmin;
        $scope.adminkey = key;
        if(!becomeAdmin){
            var blockAction = $scope.minimumAdmins(true);
        }
        if(!blockAction){
            var data = {
                userid  : userid,
                admin   : becomeAdmin,
                chatid  : $rootScope.chatID,
                friends : $rootScope.groupFriends
            };
            $rootScope.postRequest(data ,'toggleAdmin', '');
            $rootScope.switchAdmin( userid,  $rootScope.chatID,  becomeAdmin, 0);
        }
    }

    // DELETE USER FROM GROUP (Send to alert)
    $scope.deleteUserFromGroup = function(userid) {
        // open alert
        var blockAction = $scope.minimumAdmins(false);
        if(!blockAction){
            $rootScope.toDeleteUserId = userid;
            $('#Alerts').addClass('open');
            $('#deleteUserFromGroupAlert').addClass('open');
        }
    }

    // DELETE GROUP
    $scope.deleteGroup = function(userid) {
        // open alert
        $rootScope.toDeleteUserId = userid;
        $('#Alerts').addClass('open');
        $('#deleteGroupAlert').addClass('open');
    }

    // CHECK IF THE CHAT HAS MINIMUM 1 ADMIN
    $scope.minimumAdmins = function(preventToggle){
        if($rootScope.isChatAdmin){
            var allAdmins = $rootScope.adjustElementNewArray($rootScope.groupFriends, 1,'admin', 'retreive',0,0,0);

            // allAdmins = $rootScope.filterArray(allAdmins,1);
            var blockAction = allAdmins.length < 2;
            if(blockAction){
                $('#Alerts').addClass('open');
                $('#minimunAdminsAlert').addClass('open');
            }
            // prevent checkbox from being unchecked
            if(preventToggle){
                var checkBoxes = $('#filled-in-box'+ $scope.adminkey);
                checkBoxes.prop("checked", !checkBoxes.prop("checked"));
            }
            return blockAction;
        }else {
            return false;
        }
    }

    // EDIT GROUP NAME
    $scope.editchatname = function(newChatName) {
        if(newChatName){
            if(!$rootScope.friendID){
                if(newChatName){
                    var data = {
                        newname : newChatName,
                        chatid  : $rootScope.chatID,
                        friends : $rootScope.groupFriends
                    };
                    $rootScope.postRequest(data ,'renameChat', '');
                    $rootScope.renameChat(newChatName, $rootScope.chatID);
                }
            }else{
                    var data = {
                        newname : newChatName,
                        chatid  : $rootScope.chatID,
                        friendid : $rootScope.friendID
                    };
                    $rootScope.postRequest(data ,'renameFriend', '');
                    $rootScope.renameFriend(newChatName, $rootScope.chatID);
            }
            if($('#editChatNameInput').hasClass('edit')){
                console.log($('#editChatNameInput .bubble-editButton.clear')[0].click()); //TODO moet ook zonder console werken
                $('#editChatNameInput .bubble-editButton.clear')[0].click();
            }
            $('#chatname-input').val('');
        }
    }

    // DISABLE THEME
    $scope.toggleTheme = function(themeid , index, color){
        var isActive = 1 - $rootScope.themes[index].is_active;
        $rootScope.toggleTheme = {};
        $rootScope.toggleTheme.id = themeid;
        $rootScope.toggleTheme.isActive = isActive;
        $rootScope.toggleTheme.color = color;
        $rootScope.toggleTheme.chatid =  $rootScope.chatID;
        $rootScope.toggleTheme.generalID = $rootScope.generalThemeID;
        $rootScope.postRequest($rootScope.toggleTheme ,'toggleTheme', '');
        $rootScope.themes[index].is_active = isActive;
    }

    // ALERT TO CONFIRM DELETE THEME
    $scope.deleteTheme = function(themeid, index){
        $rootScope.deleteTheme = {};
        $rootScope.deleteTheme.index = index;
        $rootScope.deleteTheme.themeid = themeid;
        $rootScope.deleteTheme.chatid = $rootScope.chatID;
        $rootScope.deleteTheme.generalID = $rootScope.generalThemeID;
        $('#Alerts').addClass('open');
        $('#deleteThemeAlert').addClass('open');
    }
})