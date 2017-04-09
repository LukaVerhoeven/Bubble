app.controller('GlobalController', function($scope, $http, API_URL, $rootScope) {

    //SORTS AN OBJECT BY PARAMETER
    $rootScope.sort_by = function (field, reverse, primer) {
        var key = primer ? 
        function(x) {return primer(x[field])} : 
        function(x) {return x[field]};

        reverse = !reverse ? 1 : -1;

        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        } 
    }

    //ENTER A CHAT
    $rootScope.openChat = function(chatID, friendName) {
        $rootScope.chatname = friendName;
        $rootScope.chatID = chatID;
    }
})