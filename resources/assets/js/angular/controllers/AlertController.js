app.controller('AlertController', function($scope, $http, API_URL, $rootScope) {
    //DELETE FRIEND Confirmed
    $rootScope.deleteFriendConfirmed = function() {
        $rootScope.postRequest($rootScope.friendDeleteData ,'deleteFriend', 'removeFriend' );
         $scope.Close();
    }

	//DELETE FRIEND Declined
    $scope.Close = function() {
    	$('#Alerts').removeClass('open');
        $('.alertbox').removeClass('open');
    }

})