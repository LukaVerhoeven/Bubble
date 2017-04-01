app.controller('GroupController', function($scope, $http,$sanitize, API_URL, $rootScope) {

    $scope.newGroup = {};
    $scope.newGroup.friends = [];

    //ERROR
    $scope.errorCallback = function(error) {
        console.log(error)
        console.log("wrong call made");
    }

    //ADD AND REMOVE FRIENDS TO THE NEW GROUP
    $scope.toggleFriendToGroup = function(id, array, arrayToAdd){
        array.forEach(function (obj, i) {
            if(obj.chatid === id){
                array.splice(i,1);
                arrayToAdd.push(obj);
            }
        });
        arrayToAdd.sort($scope.sort_by('name', false, function(a){return a.toUpperCase()}));
    }

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
            
        }, $scope.errorCallback);
    }

    $scope.sort_by = function (field, reverse, primer) {
        var key = primer ? 
        function(x) {return primer(x[field])} : 
        function(x) {return x[field]};

        reverse = !reverse ? 1 : -1;

        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        } 
    }


})