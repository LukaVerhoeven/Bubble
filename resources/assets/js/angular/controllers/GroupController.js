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
        $scope.newGroup.chatname = $sanitize($scope.newGroup.chatname)
        $http({
            method: 'POST',
            url: url,
            data: $.param($scope.newGroup),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(response) {
            $rootScope.getFriendChats();
        }, $rootScope.errorCallback);
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
})