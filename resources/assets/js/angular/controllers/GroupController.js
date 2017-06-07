app.controller('GroupController', function($scope, $http,$sanitize, API_URL, $rootScope) {

    $scope.newGroup = {};
    $scope.newGroup.friends = [];

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
    $scope.hasChildren = function(list, model){
        return list.filter(function(item){console.log(item.nickname,  $scope.$parent.groupFriendInput);return item.nickname.indexOf(model) !== -1});
    }
    //CREATES A GROUP
    $scope.createGroup = function(){
        var url = API_URL + "createGroup";
        console.log('grop', $scope.newGroup);
        // $scope.newGroup.chatname = $sanitize($scope.newGroup.chatname)
        $http({
            method: 'POST',
            url: url,
            data: $.param($scope.newGroup),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(response) {
            $rootScope.getFriendChats(); //TODO do this asynchrone front-end
            // remove all friends added to group front-end
            $rootScope.friendsForGroup = $rootScope.friendlist;
            $scope.newGroup.friends = [];
            $('#createGroupsName').val('');
        }, $rootScope.errorCallback);
    }
    $scope.test = function(){

        console.log($scope.createGroup);
    }
    //ACCEPT GROUP INVITE
    $scope.accept = function (chatid, friends) {
        friends = $rootScope.ObjToArray(friends);
        $rootScope.countGroupRequests--;
        var url = API_URL + "accept";
        var data = {
            chatid : chatid,
            friends : friends
        };
        $http({
            method: 'POST',
            url: url,
            data: $.param(data) ,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(function(response) {
            
        }, $scope.errorCallback);
        $scope.update(chatid, true);
    }

    //DECLINE GROUP INVITE
    $scope.decline = function (chatid, friends) {
        var url = API_URL + "decline";
        $rootScope.countGroupRequests--;
        var data = {
            chatid : chatid,
            friends: friends
        }
        $http({
            method: 'POST',
            url: url,
            data: $.param(data) ,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(function(response) {
            
        }, $scope.errorCallback);
        $scope.update(chatid, false);
    }

    //UPDATE GROUPS AFTER ACCEPTING OR DECLING GROUPREQUEST
    $scope.update = function (id , accept) {
        if (accept) {
            $rootScope.groups.forEach(function (obj, i) {
                if(obj.chat_id === id){
                    obj.confirmed = 1;
                }
            });
            $rootScope.groups.sort($rootScope.sort_by('chat_name', false, function(a){return a.toUpperCase()}));
        }else {
            $rootScope.groups.forEach(function (obj, i) {
                if(obj.chat_id === id){
                    $rootScope.groups.splice(i,1);
                }
            });
        }
    }

    // Real-time update chat. When user accept chat-invite
    $rootScope.userConfirmed = function (userid, chatid, user) {
        $rootScope.IsEdited = false;
        $rootScope.adjustArrayFromObject($rootScope.groups, [chatid, userid], ['chat_id', 'user_id'], 'edit', 1, 'confirmed',1,0);
        if(!$rootScope.IsEdited){
            $rootScope.adjustArrayFromObject($rootScope.groups, [chatid, user], ['chat_id', 'friends'], 'update', 0, 0,1,0);
            $rootScope.ArrayInObjectsort_by('name', false, function(a){return a.toUpperCase()}, $rootScope.groups)
            if($rootScope.groupFriends){
                $rootScope.groupFriends.push(user);
                $rootScope.groupFriends.sort($rootScope.sort_by('name', false, function(a){return a.toUpperCase()}));
            }
        }else{
            if($rootScope.chatID === chatid){
                var groupFriends = $rootScope.ObjToArray($rootScope.groupFriends);
                $rootScope.adjustObjectElement(groupFriends ,userid, 'user_id', 'edit', 1, 'confirmed', 0);
            }
            $rootScope.IsEdited = false;
        }
    }

    // REMOVE GROUP VISUALY called when allert is confirmed
    $rootScope.removeGroup = function() {
        $rootScope.adjustObjectElement($rootScope.groups, $rootScope.chatID,'chat_id', 'remove',0,0,0);
        $rootScope.resetChat();
    }

    $rootScope.switchAdmin = function(userid, chatid, isAdmin, isAdjustedUser) {
        $rootScope.adjustArrayFromObject($rootScope.groups, [chatid, userid], ['chat_id', 'user_id'], 'edit', isAdmin, 'admin', 1, 0);
        if(isAdjustedUser){
            $rootScope.adjustObjectElement($rootScope.groups, chatid, 'chat_id', 'edit', isAdmin, 'userIsAdmin', 0);
        }
        if ($rootScope.chatID === chatid) {
            $rootScope.adjustObjectElement($rootScope.groupFriends, userid, 'user_id', 'edit', isAdmin, 'admin', 0);
            if($rootScope.chatID == chatid && isAdjustedUser){
                $rootScope.isChatAdmin = isAdmin;
            }
        }
    }

    // RENAME GROUPSCHAT
    $rootScope.renameChat = function(newname, chatid) {
        $rootScope.adjustObjectElement($rootScope.groups, chatid, 'chat_id', 'edit', newname, 'chat_name', 0);
        if ($rootScope.chatID === chatid) {
            $rootScope.chatname = newname
        }
    }
})