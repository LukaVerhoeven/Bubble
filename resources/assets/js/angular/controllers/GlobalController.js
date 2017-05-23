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

    $rootScope.containsObject = function (obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i] === obj) {
                return i;
            }
        }
        return false;
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
        var keyElementIsArray = keyElement.constructor === Array;
        data.forEach(function (obj, i) {
            var retreiveCounter = 0;
            for (var key in obj) {
                // search on specific key
                if(keyElement){
                    if(CheckMultipleValues){
                        // if value is an array check if one elements in the array = obj[key]
                        if(!keyElementIsArray){
                            value.forEach( function(element, index) {
                                if(obj[key] == value[index]){
                                    // remove
                                    if(action === 'remove'){
                                        retreiveData.push(element); 
                                        // retreiveData = data.splice(i,1);
                                    }
                                    // edit
                                    if(action === 'edit'){
                                        obj[editKey] = editValue;
                                        $rootScope.IsEdited = true;
                                    }
                                }
                            });
                        }else if(valueIsArray){
                            keyElement.forEach( function(element, index) {
                                if(key == element){
                                    if(obj[key] == value[index]){
                                        // remove
                                        if(action === 'remove'){
                                            retreiveData.push(element); 
                                            // retreiveData = data.splice(i,1);
                                        }
                                        // edit
                                        if(action === 'edit'){
                                            obj[editKey] = editValue;
                                            $rootScope.IsEdited = true;
                                        }
                                        if(action === 'retreive'){
                                            retreiveCounter++;
                                        }
                                    }
                                }
                            });
                            if(retreiveCounter == value.length && action === 'retreive'){
                                retreiveData.push(obj);
                            }
                        }
                    }
                    if(key === keyElement){
                        if(!CheckMultipleValues){
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
                            // console.log('key', key, 'value', obj[key], 'myval', value);
                            // console.log(obj[key] == value)
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
        // Return Retreived data
        if(action === 'remove' && valueIsArray && CheckMultipleValues){
            var length = retreiveData.length
            for (var i = 0; i < length; i++) {
                var userid = retreiveData[i];
                var index =data.map(x => x[keyElement]).indexOf(retreiveData[i])
                if(index !== -1){
                    data.splice(index ,1);
                }
            }
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
        var editElements = [];
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
                        arrayFound = true;
                        doAdjust = true;
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
                                editElements.push(obj);
                            }
                        }else{
                            $rootScope.adjustObjectElement(array , elementValue , keyvalue, action, editValue, editKey, CheckMultipleValues);
                            // update data
                            $rootScope.adjustObjectElement(data ,value[0] , keyElement[0], 'edit', array, editKey,0,0,0);
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
                    if(action === 'retreive'){
                        var foundObj = $rootScope.adjustElementNewArray(array ,[elementValue[0], elementValue[1] ], [keyvalue[0], keyvalue[1]], 'retreive', editValue, editKey,1);
                        if(foundObj[0]){
                            editElements.push(obj);
                        }
                    }
                }
            }
        });
        if(editElements.length>0 && action === 'remove'){
            editElements.forEach( function(element, index) {
                index = $rootScope.containsObject(element, data);
                data.splice(index,1);
            });
        }
        if(editElements.length>0 && action === 'retreive'){
            data.splice(0,data.length);
            data.push.apply(data, editElements);  
        }
    }

    // REMOVE AN ELEMENT FROM AN OBJECT by value in Array and return new 
    $rootScope.adjustArrayElementNewArray = function(data, value, keyElement, action, editValue, editKey, MultipleValues, CheckMultipleValues) {
        var newArray = data.slice(0, data.lenght); // copy the array into a new variable
        $rootScope.adjustArrayFromObject(newArray, value, keyElement, action, editValue, editKey, MultipleValues, CheckMultipleValues);
        return newArray ;
    }

    // $rootScope.objectInArray = {};
    // $rootScope.objectInArray.remove = function(object){
    //     console.log(object);
    //     var retreiveData = [];
    //     if(object.data.constructor !== Array){
    //           var array = [object.data];
    //           object.data = array;
    //     }
    //     // console.log('remove-function', object.checkvalue , object.keyvalue ,object.data)
    //     if(typeof object.checkvalue === 'object' || object.checkvalue.constructor === Array){
    //         if(typeof object.keyvalue === 'object' || object.keyvalue.constructor === Array){
    //             if(object.keyvalue.length === object.checkvalue.length){
    //                 // foreach object in the dataArray
    //                 var datalength = object.data.length;
    //                 for (var arrayIndex = 0; arrayIndex < datalength; arrayIndex++) {
    //                     // check how many property are passed => so only if they got al the properties is will return true
    //                     // this is for deleting the object if it contains the mutiple values (object.checkvalue)
    //                     obj = object.data[arrayIndex]
    //                     var length = object.keyvalue.length;
    //                     var amountCorrect = 0;
    //                     // foreach property in the object
    //                     for (var prop in obj) {
    //                         // console.log(prop);
    //                         object.keyvalue.forEach( function(keyvalue, keyIndex) {
    //                             // console.log(prop, obj[prop],  keyvalue, prop === keyvalue,object.checkvalue[keyIndex],  obj[prop] === object.checkvalue[keyIndex])
    //                             // find the right propert of the obj
    //                             if(prop === keyvalue){
    //                                 if(obj[prop] === object.checkvalue[keyIndex]){
    //                                     amountCorrect++;
    //                                 }
    //                             }
    //                          });
    //                     };
    //                     if(amountCorrect !== length){
    //                         editData.push(obj)
    //                     }
    //                 }
    //             }else{
    //                 return "keyvalue and checkvalue have a diffrent length";
    //                 console.log("keyvalue and checkvalue have a diffrent length");
    //             }
    //         }else{
    //             return "checkvalue and keyvalue need both to be an array";
    //             console.log("checkvalue and keyvalue need both to be an array");
    //         }
    //     }else if(typeof object.keyvalue === 'object' || object.keyvalue.constructor === Array){
    //         return "checkvalue and keyvalue need both to be an array";
    //         console.log("checkvalue and keyvalue need both to be an array");
    //     }else{
    //         // not an array of object
    //     }

    //     //reversed remove => if obj has all checkvalues => don't remove
    //     var length = retreiveData.length
    //     for (var i = 0; i < length; i++) {
    //         var userid = retreiveData[i];
    //         var index =data.map(x => x.retreiveData[i].key).indexOf(retreiveData[i].val)
    //         if(index !== -1){
    //             data.splice(index ,1);
    //         }
    //     }
    // }

    // $rootScope.objectInArray.removeInArray = function(object){
    //     // object.data
    //     var length = object.data.length;
    //     console.log('lenghh', length);
    //     for (var i = 0; i < length; i++) {
    //         var obj = object.data[i];
    //         for (var prop in obj) {
    //             // console.log(prop, obj);
    //             // console.log(object.arrayKey, prop === object.arrayKey ,obj[prop].constructor === Array);
    //             if(prop === object.arrayKey && obj[prop].constructor === Array){
    //                 if(object.data.constructor !== Array){
    //                     var array = [object.data];
    //                     object.data = array;
    //                 }
    //                 // new object to compare with the orignal
    //                 var newObject = {};
    //                 newObject.data = object.data.slice(0, object.data.lenght); // copy array
    //                 newObject.keyvalue = object.keyvalue;
    //                 newObject.checkvalue = object.checkvalue;
    //                 // remove elements from the array
    //                 $rootScope.objectInArray.remove(newObject);
    //                 // if less elements are in the arrayKey => delete this object
    //                 if(newObject.data.length !== object.data[i][object.arrayKey].length){
    //                     object.data.splice(i ,1);
    //                 }
    //             }else if (prop === object.arrayKey) {
    //                 return "the value for arrayKey is not an array";
    //                 console.log("the value for arrayKey is not an array");
    //             }
    //         };
    //     }
    // }

    // $rootScope.objectInArray.removeInArrayNew = function(object){
    //     var newObject = {};
    //     newObject.data = object.data.slice(0, object.data.lenght); // copy array
    //     newObject.keyvalue = object.keyvalue;
    //     newObject.checkvalue = object.checkvalue;
    //     newObject.arrayKey = object.arrayKey;
    //     $rootScope.objectInArray.removeInArray(newObject);
    //     return newObject.data;
    // }

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
        $("#load-content").addClass('active');
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
        $rootScope.messages.items = null;
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