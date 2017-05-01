app.controller('GlobalController', function($scope, $http, API_URL, $rootScope) {
    // GLOBAL FUNCTIONS
    // ERROR
    $rootScope.errorCallback = function(error) {
        // console.log(error);
        console.log("wrong call made");
    }

    //POST FUNCTION
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

    // ARRAYS AND OBJECTS
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

    // REMOVE AN ELEMENT FROM AN OBJECT By value
    $rootScope.adjustObjectElement = function(data, value, keyElement, action, editValue, editKey) {
        data.forEach(function (obj, i) {
            for (var key in obj) {
                // search on specific key
                if(keyElement){
                    console.log(key , keyElement);
                    if(key === keyElement){
                        if(obj[key] == value){
                            // remove
                            if(action === 'remove'){
                                data.splice(i,1);
                            }
                            // edit
                            if(action === 'edit'){
                                console.log(obj[editKey])
                                obj[editKey] = editValue;
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
                        }
                    }
                }
            }
        });
    }

    // REMOVE AN ELEMENT FROM AN OBJECT by value and return new 
    $rootScope.adjustElementNewArray = function(data, value, keyElement, action, editValue, editKey) {
        var newObject = data.slice(0, data.lenght); // copy the array into a new variable
        $rootScope.adjustObjectElement(newObject, value, keyElement, action, editValue, editKey);
        return newObject;
    }

    // REMOVE AN ELEMENT FROM AN OBJECT by value in Array
    $rootScope.adjustArrayFromObject = function(data, value, keyElement, action, editValue, editKey, adjustAllObjects) {
        var doAdjust, arrayFound = false;
        var prevI = 0;
        var elementValue, keyvalue, array, prevI;
        data.forEach(function (obj, i) {
            for (var key in obj) {
                // reset array found every time you check a new object
                if(prevI < i){
                    prevI = i;
                    arrayFound = false;
                }
                // Check if you can adjust the array in every object or if we can adjust the array of a specific object
                if(adjustAllObjects){
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
                // adjust the array of every object
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
                        var isSameObj = $rootScope.adjustElementNewArray(array , elementValue , keyvalue, action, editValue, editKey);
                        if(array.length !== isSameObj.length){
                            data.splice(i,1);
                        }
                    }if(action === 'edit'){
                        $rootScope.adjustObjectElement(array , elementValue , keyvalue, action, editValue, editKey);
                    }
                }
            }
        });
    }

    // REMOVE AN ELEMENT FROM AN OBJECT by value in Array and return new 
    $rootScope.adjustArrayElementNewArray = function(data, value, keyElement, action, editValue, editKey, adjustAllObjects) {
        var newObject = data.slice(0, data.lenght); // copy the array into a new variable
        $rootScope.adjustArrayFromObject(newObject, value, keyElement, action, editKey, adjustAllObjects);
        return newObject;
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

    // MULTICONTROLLER FUNCTIONS
    // ENTER A CHAT
    $rootScope.openChat = function(chatID, friendID, friendName, chatFunction, friends, userIsAdmin) {
        // Chat
        $rootScope.chatname = friendName;
        $rootScope.chatID = chatID;
        $rootScope.friendID = friendID;
        // Settings
        $rootScope.chatFunction = chatFunction;
        $rootScope.groupFriends = friends;
        $rootScope.isChatAdmin = userIsAdmin;
    }

    // OPEN CHAT
    $rootScope.$watch(function() {
        return $rootScope.chatID;
    }, function() {
        if ($rootScope.chatID) {
            $rootScope.makeBroadcastConnection = true;
            $rootScope.updateChat($rootScope.chatID);
        }
    }, true);

    // Make a broadcast connection for the user to create Real-time action. (ex. friendrequest)
    $rootScope.broadcastUser = function(userid) {

        Echo.join(`user.${userid}`)
            .here((users) => {
                // this.usersInRoom = users;
            })
            .joining((user) => {
                // this.usersInRoom.push(user);
            })
            .leaving((user) => {
                // this.usersInRoom = this.usersInRoom.filter(u => u != user);
            })
            .listen('UserEvents', (e) => {
                if(e.data.type === 'grouprequest'){
                    $scope.$apply(function() {
                        $rootScope.groups.push(e.data);
                    });
                }
                if(e.data.type === 'friendrequest'){
                    $scope.$apply(function() {
                        $rootScope.friendRequests.push(e.data);
                    });
                }
                console.log(e.data);
                if(e.data.type === 'groupaccept'){
                    console.log(e.data)
                    $scope.$apply(function() {
                        $rootScope.userConfirmed(e.data.userid, e.data.chatid);
                    });
                }
            });
    };



})