var app = angular.module('bubble',['ngSanitize'])
        .constant('API_URL','http://bubble.local/api/');
        // .constant('API_URL','http://lukaverhoevenmtantwerpeu.webhosting.be/api/');
        // .constant('API_URL','http://bubble-lukaverhoeven.c9users.io/api/');
app.controller('GlobalController', function($scope, $http, API_URL, $rootScope) {
    //************ GLOBAL FUNCTIONS ************
    // ERROR
    $rootScope.errorCallback = function(error) {
        // console.log(error);
        console.log("wrong call made");
    }

    //************ HTTP FUNCTIONS ************
    // POST FUNCTION
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

    //************ ARRAYS AND OBJECTS ************
    $rootScope.IsEdited = false;
    // array prepend
    $rootScope.prependArray = function prepend(value, array) {
        console.log(array);
      var newArray = array.slice();
      newArray.unshift(value);
      return newArray;
    }

    // Filter an array on specific value. ex ([1,2], 1) => [1]
    $rootScope.filterArray = function (array, value) {
        var filteredArray = array.filter(checkvalue);
        function checkvalue(element) {
            return element == value;
        }
        return filteredArray;
    }

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

    // SORTS OBJECTS IN A ARRAY OF AN OBJECT BY PARAMETER
    $rootScope.ArrayInObjectsort_by = function (field, reverse, primer,variable) {
        for (var key in variable) {
            if(variable[key].friends.constructor === Array){
                variable[key].friends.sort($rootScope.sort_by(field, reverse, primer));
            }
        }
    }

    // REMOVE AN ELEMENT FROM AN OBJECT By value
    $rootScope.adjustObjectElement = function(data, value, keyElement, action, editValue, editKey, CheckMultipleValues) {
        var retreiveData = [];
        var valueIsArray = value.constructor === Array;
        data.forEach(function (obj, i) {
            for (var key in obj) {
                // search on specific key
                if(keyElement){
                    if(key === keyElement){
                        if(CheckMultipleValues){
                            // if value is an array check if one elements in the array = obj[key]
                            if(valueIsArray){
                                value.forEach( function(element, index) {
                                    if(obj[key] == element){
                                        // remove
                                        if(action === 'remove'){
                                            data.splice(i,1);
                                        }
                                        // edit
                                        if(action === 'edit'){
                                            obj[editKey] = editValue;
                                            $rootScope.IsEdited = true;
                                        }
                                    }
                                });
                            }
                        }else{
                            if(valueIsArray){ // this does not work with an array of objects because : x{data:1} != x{data:1}
                                if(obj[key].toString() == value.toString()){
                                    // remove
                                    if(action === 'remove'){
                                        data.splice(i,1);
                                    }
                                    // edit
                                    if(action === 'edit'){
                                        obj[editKey] = editValue;
                                        $rootScope.IsEdited = true;
                                    }
                                }
                            }else{
                                // check if the value = obj[key]
                                if(obj[key] == value){
                                    // remove
                                    if(action === 'remove'){
                                        data.splice(i,1);
                                    }
                                    // edit
                                    if(action === 'edit'){
                                        obj[editKey] = editValue;
                                        $rootScope.IsEdited = true;
                                    }
                                    if(action === 'increment'){
                                        obj[editKey]++;
                                    }                                    
                                    if(action === 'update'){ //add new element then update
                                        var prop = editKey;
                                        obj[prop] = editValue;
                                    }
                                }
                            }
                        }
                        // Retreive data
                        if(action === 'retreive'){
                            if(value){
                                if(obj[key] == value){
                                    retreiveData.push(obj[editKey]);    
                                }
                            }else{
                                retreiveData.push(obj[key]);
                            }
                        }
                    }
                }else{
                // search all elements
                    if(obj[key] == value){
                        // remove
                        if(action === 'remove'){
                            data.splice(i,1);
                        }
                         // edit
                        if(action === 'edit'){
                            obj[editKey] = editValue;
                            $rootScope.IsEdited = true;
                        }
                    }
                }
            }
        });
        // Return Retreived data
        if(action === 'retreive'){
            data.splice(0,data.length);
            data.push.apply(data, retreiveData);
        }
    }

    // REMOVE AN ELEMENT FROM AN OBJECT by value and return new 
    $rootScope.adjustElementNewArray = function(data, value, keyElement, action, editValue, editKey, CheckMultipleValues) {
        var newArray = data.slice(0, data.lenght); // copy the array into a new variable
        $rootScope.adjustObjectElement(newArray, value, keyElement, action, editValue, editKey, CheckMultipleValues);
        return newArray;
    }

    // REMOVE AN ELEMENT FROM AN OBJECT by value in Array
    $rootScope.adjustArrayFromObject = function(data, value, keyElement, action, editValue, editKey, MultipleValues, CheckMultipleValues) {
        var doAdjust, arrayFound = false;
        var prevI = 0;
        var elementValue, keyvalue, array, prevI;
        data.forEach(function (obj, i) {
            if(prevI < i){
                prevI = i;
                arrayFound = false;
                doAdjust = false;
            }
            for (var key in obj) {
                // reset array found every time you check a new object
                // Check if you can adjust the array in every object or if we can adjust the array of a specific object
                if(MultipleValues){
                    // Check if this is specific object
                    if(typeof obj[key] === 'object' || obj[key].constructor === Array){
                        array = $rootScope.ObjToArray(obj[key]);
                        arrayFound = true;
                    }
                    if(key == keyElement[0] && obj[key] == value[0]){
                        doAdjust = true;
                        elementValue = value[1];
                        keyvalue = keyElement[1];

                    }
                }else{
                // otherwise adjust the array of every object (if the conditions are right)
                    if(typeof obj[key] === 'object' || obj[key].constructor === Array){
                        doAdjust, arrayFound = true;
                        elementValue = value;
                        keyvalue = keyElement;
                        array = $rootScope.ObjToArray(obj[key]);
                    }
                }
                // If doAdjust is true => we adjust the array of the object
                if (doAdjust && arrayFound) {
                    doAdjust, arrayFound = false;
                    if(action === 'remove'){
                        // if you want to delete te parent obj set editValue on true
                        var deleteParentObj = editValue;
                        if(deleteParentObj){
                            var isSameObj = $rootScope.adjustElementNewArray(array , elementValue , keyvalue, action, editValue, editKey, CheckMultipleValues);
                            if(array.length !== isSameObj.length){
                                data.splice(i,1);
                            }
                        }else{
                            $rootScope.adjustObjectElement(array , elementValue , keyvalue, action, editValue, editKey, CheckMultipleValues);
                            // update data
                            $rootScope.adjustObjectElement(data ,value[0] , keyElement[0], 'edit', array, editKey,0);
                        }
                    }
                    if(action === 'edit'){
                        $rootScope.adjustObjectElement(array , elementValue , keyvalue, action, editValue, editKey,CheckMultipleValues);
                    }
                    if(action === 'update'){ //add new element then update
                        var newArray = [];
                        newArray = array.slice(0, array.lenght)
                        newArray.push(elementValue);
                        var prop = keyvalue;
                        obj[prop] = newArray;
                    }
                }
            }
        });
    }

    // REMOVE AN ELEMENT FROM AN OBJECT by value in Array and return new 
    $rootScope.adjustArrayElementNewArray = function(data, value, keyElement, action, editValue, editKey, MultipleValues, CheckMultipleValues) {
        var newArray = data.slice(0, data.lenght); // copy the array into a new variable
        $rootScope.adjustArrayFromObject(newArray, value, keyElement, action, editKey, MultipleValues, CheckMultipleValues);
        return newArray ;
    }

    // CONVERT OBJECT TO AN ARRAY
    $rootScope.ObjToArray = function(obj) {
        var array = $.map(obj, function(value, index) {
            return [value];
        });
        return array;
    }

    $rootScope.ArrToObj = function(arr){
        var rv = {};
        for (var i = 0; i < arr.length; ++i){
            rv[i] = arr[i];
        }
        return rv;
    }

    // ************ MULTICONTROLLER FUNCTIONS ************
    // ENTER A CHAT
    $rootScope.openChat = function(chatID, friendID, friendName, chatFunction, friends, userIsAdmin, index) {
        // Get messages and enter chatBroadcast channel
        $(".conversation-tab a")[0].click();
        if(chatID != $rootScope.chatID){
            $rootScope.makeBroadcastConnection = true;
            $rootScope.updateChat(chatID);
        }
        // Chat
        $rootScope.chatname = friendName;
        $rootScope.chatID = chatID;
        $rootScope.friendID = friendID;
        // Settings
        $rootScope.groupFriends = friends;
        $rootScope.chatFunction = chatFunction;
        $rootScope.isChatAdmin = userIsAdmin;
        if($rootScope.groupFriends){
            $rootScope.groupFriends = $rootScope.ObjToArray(friends);
            $rootScope.groupFriends.sort($rootScope.sort_by('name', false, function(a){return a.toUpperCase()}));
            $rootScope.groups[index].unread_messages = 0;
        }else{
            $rootScope.friendlist[index].unread_messages = 0;
        }
        // retreive messages per paginate
        $scope.readmessages = {};
        $scope.readmessages.chatid = $rootScope.chatID;
        $scope.readmessages.userid = $rootScope.Authuserid;
        $rootScope.postRequest($scope.readmessages ,'readMessages', '');
    }

    $rootScope.resetChat = function() {
        $(".conversation-tab a")[0].click();
        // Chat
        $rootScope.chatname = 'CHAT';
        $rootScope.chatID        = null;
        $rootScope.friendID      = null;
        $rootScope.chatFunction  = null;      
        $rootScope.groupFriends  = null;
        $rootScope.isChatAdmin   = null;
        $rootScope.messages.items      = null;
    }

    // REMOVE LOADING SCREEN WHEN ANGULAR IS LOADED
    $scope.$watch('$viewContentLoaded', function()
    {
        $('.fullscreen-loader').addClass('hide');
    });

    $rootScope.broadcastUser = function(userid) {

        Echo.join(`user.${userid}`)
            .here((users) => {
                // this.usersInRoom = users;
            })
            .joining((user) => {
                
            })
            .leaving((user) => {

            })
            .listen('UserEvents', (e) => {
                $scope.$apply(function() {
                    if(e.event === 'grouprequest'){
                        $rootScope.groups.push(e.data);
                    }
                    if(e.event === 'friendrequest'){
                        $rootScope.friendRequests.push(e.data);
                    }
                    if(e.event === 'groupaccept'){
                        $rootScope.userConfirmed(e.data.userid, e.data.chatid, e.data.user);
                    }
                    if(e.event === 'leavegroup'){
                        if($rootScope.Authuserid === e.data.userid){
                            $rootScope.resetChat();
                            $rootScope.adjustObjectElement($rootScope.groups, e.data.chatid, 'chat_id', 'remove', 0, 0, 0);
                        }else{
                            $rootScope.adjustArrayFromObject($rootScope.groups, [e.data.chatid, e.data.userid], ['chat_id', 'user_id'], 'remove', 0, 'friends', 1, 0);
                            if ($rootScope.chatID === e.data.chatid) {
                                $rootScope.adjustObjectElement($rootScope.groupFriends, e.data.userid, 'user_id', 'remove', 0, 0, 0);
                            }
                        }                        
                    }
                    if(e.event === 'toggleAdmin'){
                        if($rootScope.Authuserid === e.data.userid){
                            $rootScope.switchAdmin( e.data.userid,  e.data.chatid,  e.data.admin, 1);
                        }else{
                            $rootScope.switchAdmin( e.data.userid,  e.data.chatid,  e.data.admin, 0);
                        }
                    }
                    if(e.event === 'chatdeleted'){
                        $rootScope.adjustObjectElement($rootScope.groups, e.data.chatid, 'chat_id', 'remove', 0, 0, 0);
                        if ($rootScope.chatID === e.data.chatid) {
                            $rootScope.resetChat();
                        }
                    }
                    if(e.event === 'renamechat'){
                        $rootScope.renameChat(e.data.newname, e.data.chatid);
                    }
                    if(e.event === 'deletefriend'){
                        $rootScope.removeFriend(e.data);
                    }
                    if(e.event === 'acceptfriend'){
                        $rootScope.addFriend(e.data);
                    }
                    if(e.event === 'sendOnline'){
                        $scope.onlinestate = {};
                        $scope.onlinestate.authid = $rootScope.Authuserid;
                        $scope.onlinestate.userid = e.data;
                        $rootScope.adjustObjectElement($rootScope.friendlist, e.data, 'userid', 'update', 1, 'isOnline', 0);
                        $rootScope.postRequest($scope.onlinestate ,'onlineAnswer', '');
                    }
                    if(e.event === 'receiveOnline'){
                        $rootScope.adjustObjectElement($rootScope.friendlist, e.data, 'userid', 'update', 1, 'isOnline', 0);
                    }
                    if(e.event === 'unreadmessage'){
                        console.log(e)
                        $rootScope.adjustObjectElement($rootScope.friendlist, e.data, 'chatid', 'increment', 1, 'unread_messages', 0);
                    }                    
                });
            });
    };
})
app.controller('AlertController', function($scope, $http, API_URL, $rootScope) {
    //DELETE FRIEND Confirmed
    $rootScope.deleteFriendConfirmed = function() {
        $rootScope.postRequest($rootScope.friendDeleteData ,'deleteFriend', '');
        $rootScope.removeFriend($rootScope.chatID);
        $scope.Close();
    }

    // ADD FRIEND TO A GROUP
    $scope.addFriendToGroupAlert = function(chatID, friendID, chat_name, friends, friendName) {        
        if(!friendID){
            friendID = $rootScope.friendID;
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
        $rootScope.groupFriends.push(data);
        $rootScope.adjustObjectElement($rootScope.FriendsNotInGroup, friendID, 'userid', 'remove', 0, 0, 0, 0);
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

    //CREATES A GROUP
    $scope.createGroup = function(){
        var url = API_URL + "createGroup";
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

    //ACCEPT GROUP INVITE
    $scope.accept = function (chatid, friends) {
        friends = $rootScope.ObjToArray(friends);
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

      $rootScope.renameChat = function(newname, chatid) {
            $rootScope.adjustObjectElement($rootScope.groups, chatid, 'chat_id', 'edit', newname, 'chat_name', 0);
            if ($rootScope.chatID === chatid) {
                $rootScope.chatname = newname
            }
      }
})
app.controller('MessageController', function($scope, $http, API_URL, $rootScope, Messages) {
    $scope.message = {};
    $scope.message.theme = '1';
    $rootScope.makeBroadcastConnection = false;
    $rootScope.messagesLoaded = 0;

    //UPDATE CHAT
    $scope.successGetMessage = function(response) {
        // $rootScope.messages.items = response.data.messages;
        $rootScope.messagesLoaded = 0;
        $rootScope.messages = new Messages();
        $rootScope.messages.nextPage();
        $rootScope.themes = response.data.themes;
        $rootScope.generalThemeID = $rootScope.adjustElementNewArray($rootScope.themes, 1,'is_general', 'retreive',0,'id',0)[0];
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
        console.log($rootScope.themes ,$rootScope.messages.items);
    };

    $rootScope.updateChat = function(chatid) {
        $http.get(API_URL + "message" + "/" + chatid)
            .then($scope.successGetMessage, $rootScope.errorCallback);
    };

    //SEND A MESSAGE
    $scope.sendMessage = function(keyEvent) {
        if (keyEvent.which === 13 || keyEvent === 13) {
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
                $scope.message.text = $textInput.val();
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
                    $rootScope.postRequest($scope.chatfriends ,'newMessage', '');
                    $scope.scrollDown();
                }, $rootScope.errorCallback);
                $scope.message.text = null;
            }
        }
    };

    //BROADCAST CONNECTION
    $scope.broadcast = function(chatid) {
        $scope.currentChatroom = `chatroom.${chatid}`;
        console.log(`chatroom.${chatid}`);
        // to retreive friends that are not in the chat
        $scope.chatfriends = {};
        $scope.chatfriends.chatid = chatid;
        if($rootScope.chatFunction === 'friendchat'){
            $scope.chatfriends.Ids = [$rootScope.friendID];
        }else if ($rootScope.chatFunction === 'groupschat') {
            $scope.chatfriends.Ids = $rootScope.adjustElementNewArray($rootScope.groupFriends, 0,'user_id', 'retreive',0,0,0);
        }
        $scope.scrollDown();
        Echo.join(`chatroom.${chatid}`)
            .here((users) => {
                $scope.chatfriends.active = $rootScope.adjustElementNewArray(users, 0,'id', 'retreive',0,0,0);
                $scope.chatfriends.NotActive = $scope.chatfriends.Ids.filter(function(e){return this.indexOf(e)<0;}, $scope.chatfriends.active);
            })
            .joining((user) => {
                $scope.chatfriends.active.push(user.id);
                $scope.chatfriends.NotActive = $scope.chatfriends.Ids.filter(function(e){return this.indexOf(e)<0;}, $scope.chatfriends.active);
            })
            .leaving((user) => {
                $scope.chatfriends.active = $scope.chatfriends.active.filter(function(e){return this.indexOf(e)<0;},[user.id]);
                $scope.chatfriends.NotActive = $scope.chatfriends.Ids.filter(function(e){return this.indexOf(e)<0;}, $scope.chatfriends.active);
            })
            .listen('UpdateChat', (e) => {
                $scope.$apply(function() {
                    var newMessage = {
                        text: e.message.text,
                        theme_id: e.message.theme_id,
                        name: e.user.name,
                        user_id: e.message.user_id,
                        profile_image: e.message.profile_image,
                        force_theme: e.message.force_theme,
                        color: e.message.color,
                    }
                    $rootScope.messages.items = $rootScope.prependArray(newMessage, $rootScope.messages.items)
                    $scope.scrollDown();
                    $rootScope.updateThemeUsage(); //update Theme usage
                });
            })
            .listen('ProfileImage', (e) => {
                $scope.$apply(function() {
                    $rootScope.adjustObjectElement($rootScope.messages.items ,e.userid, 'user_id', 'edit', e.profileImage, 'profile_image', 0);
                });
            })
            .listen('ThemeEvent', (e) => {
                $scope.$apply(function() {
                    if($rootScope.themes){
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

    $rootScope.scrollDown = function() {
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

    $scope.$on('$routeChangeStart', function() {
        Echo.leave($scope.currentChatroom);
    });

    // infinite scroll messages ↓↓↓↓ all code down below ↓↓↓↓ 
    $( "#scrollMessages" ).scroll(function() {
        if(this.scrollTop < 100){
            $scope.currentScrollHeight = this.scrollHeight;
            $rootScope.messages.nextPage();
        }
    });

    $rootScope.loadingScroll = function(color) {
        var $scroll = $("#scrollMessages")[0];
        setTimeout(function() {
            var scrolldifference= $scroll.scrollHeight-$scope.currentScrollHeight ;
            if(scrolldifference>0){
                $( "#scrollMessages" ).scrollTop(scrolldifference);
            }
        }, 1);
    }
})

// infinite scroll messages (retreive messages per block of pagination from laravel)
app.factory('Messages', function ($http, API_URL, $rootScope) {
    var Messages = function(){
        this.items = [];
        this.busy = false;
        this.page = 1;
    }

    Messages.prototype.nextPage = function() {
        if(this.busy) return;
        this.busy = true;
        var url = API_URL + 'getMessages/'+ $rootScope.chatID +'?page='+this.page;
        $http.get(url).then(function(response){
            for (var i = 0; i < response.data.length; i++) {
                this.items.push(response.data[i]);
            };
            this.page++;
            this.busy = false;
            if(!$rootScope.messagesLoaded){
                $rootScope.scrollDown();
                $rootScope.messagesLoaded = 1;
            }else{
                $rootScope.loadingScroll();
            }
        }.bind(this));
    }
    
    return Messages;
});

app.filter('reverse', function() {
  return function(items) {
    if(items){
        return items.slice().reverse();
    }
  };
});


app.controller('ChatSettingsController', function($scope, $http, $sanitize, API_URL, $rootScope) {
    // ADD FRIEND TO NEW GROUP (Send to alert)
    $scope.addFriendToGroup = function() {
        // get the groups were you'r friend isn't already in
        $rootScope.groupsWithoutFriend = $rootScope.adjustArrayElementNewArray($rootScope.groups, $rootScope.friendID, 'user_id', 'remove',1,0,0,0);
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
        var blockAction = $scope.minimumAdmins();
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
            var blockAction = $scope.minimumAdmins();
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
        var blockAction = $scope.minimumAdmins();
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
    $scope.minimumAdmins = function(){
        var allAdmins = $rootScope.adjustElementNewArray($rootScope.groupFriends, 1,'admin', 'retreive',0,0,0);
        allAdmins = $rootScope.filterArray(allAdmins,1);
        var blockAction = allAdmins.length < 2;
        if(blockAction){
            $('#Alerts').addClass('open');
            $('#minimunAdminsAlert').addClass('open');
        }
        // prevent checkbox from being unchecked
        var checkBoxes = $('#filled-in-box'+ $scope.adminkey);
        checkBoxes.prop("checked", !checkBoxes.prop("checked"));
        return blockAction;
    }

    // EDIT GROUP NAME
    $scope.editchatname = function(newChatName) {
        if(newChatName){
            var data = {
                newname : newChatName,
                chatid  : $rootScope.chatID,
                friends : $rootScope.groupFriends
            };
            $rootScope.postRequest(data ,'renameChat', '');
            $rootScope.renameChat(newChatName, $rootScope.chatID);
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
app.controller('ProfileController', function($scope, $http, API_URL, $rootScope) {
    $scope.uploadImage = function(image){
        var fromdata = new FormData();
        var file = image['0'];
        fromdata.append("fileToUpload", file);
        fromdata.append("chatid", $rootScope.chatID);
   
            $.ajax({
              url: API_URL + 'profileImage',
              type: 'POST',
              data: fromdata,
              processData: false,
              contentType: false,
                headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
            });
            var url = window.URL.createObjectURL(file)
            $('.profile-pic').attr('src', url);
    }
})

// app.directive("ngFileSelect",function(){
//   return {
//     link: function($scope,el){
      
//       el.bind("change", function(e){
      
//         $scope.file = (e.srcElement || e.target).files[0];
//         $scope.uploadImage();
//       })
//     }
//   }
// })
app.controller('ThemeController', function($scope, $http, API_URL, $rootScope) {
	$scope.NewTheme = {color :"red"};
	$scope.createNewTheme = function(){
		$scope.NewTheme.chatid = $rootScope.chatID;
		$scope.NewTheme.keywordString = $scope.NewTheme.keywordString.replace(/\s+/g,",").replace(/[^a-zA-Z0-9,@#]/g,'');
		$scope.NewTheme.keywordString = $scope.NewTheme.keywordString.replace(/[^a-zA-Z0-9,@#]/g,''); //sanitize
		if($scope.NewTheme.chatid){
			$rootScope.postRequest($scope.NewTheme ,'NewTheme', '');
			$scope.resetForm($scope.NewTheme);
		}
	}

	$scope.editTheme = function(theme){
		theme.generalID = $rootScope.generalThemeID;
		$rootScope.postRequest(theme ,'updateTheme', '');
	}


	$scope.resetForm = function(form){
	    for (var prop in form) {
	    	form[prop] = null;
	    }
	    $scope.createThemeForm.$setPristine();
	    $scope.createThemeForm.$setUntouched();
	}

	$rootScope.keywordToObjectArray = function(keywords){
        var keywordString = keywords.join(',');
        var objectString = keywordString.replace(/^/, '[{word:"').replace(/,/g, '"},{word:"').concat('"}]');
        objectString = objectString.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
        objectString = objectString.replace(/'/g, '"');
        objectString = objectString.replace(/[\u0000-\u0019]+/g,""); // remove invisible symbols
        objectString = JSON.parse(objectString);
        return objectString;
	}

	$rootScope.updateMessages = function(keywords, color, themeid){
		var themeMessages = []
		// check if themeid is passed to this function
		// if (keywords[prop].theme_id) {
		// 	themeid = keywords[prop].theme_id;
		// }

		for ($prop in $rootScope.messages.items) {
			if($rootScope.messages.items[$prop].force_theme === 0){
				for (prop in keywords) {
					// if messages contains a keyword an has not been forced by  a theme => give new theme
					if($rootScope.messages.items[$prop].text.indexOf(keywords[prop].word) !== -1){
						$rootScope.messages.items[$prop].theme_id = themeid;
						$rootScope.messages.items[$prop].color = color;
						themeMessages.push($rootScope.messages.items[$prop].id);
					}
				}
			}
		}
		for ($prop in $rootScope.messages.items) {
			// if messages contains none of the keywords but has the themeID => remove the theme from it
			if ($rootScope.messages.items[$prop].theme_id == themeid && themeMessages.indexOf($rootScope.messages.items[$prop].id) === -1 && $rootScope.messages.items[$prop].force_theme === 0) {
				$rootScope.messages.items[$prop].theme_id = $rootScope.generalThemeID;
				$rootScope.messages.items[$prop].color = "white";
			}
		}
	}

	$rootScope.removeThemeFromMessages = function(themeid){
		for ($prop in $rootScope.messages.items) {
			if($rootScope.messages.items[$prop].theme_id == themeid && $rootScope.messages.items[$prop].force_theme === 0){
				$rootScope.messages.items[$prop].theme_id = $rootScope.generalThemeID;
				$rootScope.messages.items[$prop].color = "white";
			}
		}
	}

	$rootScope.updateThemeUsage = function(){
		var countThemes = {};
		for (prop in $rootScope.messages.items) {
			if($rootScope.messages.items[prop].theme_id != $rootScope.generalThemeID){
				var id = $rootScope.messages.items[prop]['theme_id'];
				countThemes[id]++;
				if(isNaN(countThemes[id])){
					countThemes[id] = 1;
				}
			}
		}
		var amountMessages = Object.keys($rootScope.messages.items).length;
		if(!amountMessages){
			amountMessages = $rootScope.messages.items.length;
		}
		for (prop in $rootScope.themes) {
			var id = $rootScope.themes[prop].id;
			if(countThemes[id]){
				var usage = Math.round((countThemes[id]/amountMessages)*100) + "%"
				$rootScope.themes[prop].themeUsage = usage;
			}else {
				$rootScope.themes[prop].themeUsage = "0%";
			}
		}

	}

	// TODO maak loading screen ( i am creating your theme)
	// geen theme->id dus kan functie niet gberuiken ( maar wel leerijke functie dus ni weg doen)
	// $scope.pushNewTheme = function (newCreatedTheme){
	// 	var newTheme = JSON.parse(JSON.stringify(newCreatedTheme)); //Create unique new object
	// 	newTheme.themeUsage = "0%";
	// 	newTheme.is_active = 1;
	// 	newTheme.is_deleted = 0;
	// 	newTheme.is_general = 0;
	// 	newTheme.keywordString = newTheme.keywordString.replace(/\s+/g, ',').toLowerCase();
	// 	var filteredString = newTheme.keywordString.split(",").filter(function(e){return e}).join(',');
	// 	var objectString = filteredString.replace(/^/, '[{word:"').replace(/,/g, '"},{word:"').concat('"}]');
	// 	var newJson = objectString.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
	// 	newJson = newJson.replace(/'/g, '"');
	// 	newTheme.keywords = JSON.parse(newJson);
	// 	$rootScope.themes.push(newTheme);
	// }
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