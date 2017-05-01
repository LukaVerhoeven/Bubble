app.controller('AlertController', function($scope, $http, API_URL, $rootScope) {
    //DELETE FRIEND Confirmed
    $rootScope.deleteFriendConfirmed = function() {
        $rootScope.postRequest($rootScope.friendDeleteData ,'deleteFriend', 'removeFriend' );
        $scope.Close();
    }

    $scope.addFriendToGroupAlert = function(chatID) {
        var data = {
            newfriend : $rootScope.friendID,
            chatid : chatID
        };
        $rootScope.postRequest(data ,'addFriendToGroup', '' );
    }
    //CLOSE ALERT
    $scope.Close = function() {
        $('#Alerts').removeClass('open');
        $('.alertbox').removeClass('open');
    }


})