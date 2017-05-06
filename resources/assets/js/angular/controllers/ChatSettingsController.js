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

    // ADD FRIEND TO NEW GROUP (Send to alert)
    $scope.LeaveGroup = function() {
        // send data to alert
        // $rootScope.friendIdsInGroup = $rootScope.adjustElementNewArray($rootScope.groupFriends, 0,'user_id', 'retreive',0,0,0);
        $('#Alerts').addClass('open');
        $('#LeaveGroupschatAlert').addClass('open');
    }
})