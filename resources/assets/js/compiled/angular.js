var app = angular.module('bubble',['ngSanitize','ngTouch'])
        .constant('API_URL','http://bubble.local/api/');
        // .constant('API_URL','http://lukaverhoevenmtantwerpeu.webhosting.be/api/');
        // .constant('API_URL','http://bubble-lukaverhoeven.c9users.io/api/');
app.controller('GlobalController', function($scope, $http, API_URL, $rootScope) {
    //************ GLOBAL FUNCTIONS ************
    // ERROR
    $rootScope.errorCallback = function(error) {
        if(error.data.error === 'Unauthenticated.'){
            location.href = '/login';
        }
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
                // console.log(response);
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
                                        if(editKey){
                                            var prop = editKey;
                                            obj[prop] = editValue;
                                        }else{
                                            for (prpty in obj) {
                                                obj[prpty] = editValue[prpty];
                                            }
                                        }
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
                        console.log(foundObj.length);
                        if(foundObj.length > 0){
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
        if(action === 'retreive'){
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
        if($scope.mobileAndTabletcheck()){
            $(".drag-target").trigger("click");
            $(".drag-target").click();
            // $scope.sleep(2000);
        }
        // Get messages and enter chatBroadcast channel
        $(".conversation-tab a")[0].click();
        if(chatID != $rootScope.chatID){
            $("#load-content").addClass('active');
            $rootScope.makeBroadcastConnection = true;
            $rootScope.updateChat(chatID);
        }
       
        // Chat
        $rootScope.chatname = friendName;
        $rootScope.chatID = chatID;
        $rootScope.friendID = friendID;
        // Settings
        $rootScope.groupFriends =  $rootScope.ObjToArray(friends);
        $rootScope.chatFunction = chatFunction;
        $rootScope.isChatAdmin = userIsAdmin;
        if($rootScope.groupFriends.length>0){
            $rootScope.groupFriends = $rootScope.ObjToArray(friends);
            $rootScope.groupFriends.sort($rootScope.sort_by('name', false, function(a){return a.toUpperCase()}));
            $rootScope.groups[index].unread_messages = 0;
        }else{
            $rootScope.friendlist[index].unread_messages = 0;
        }
        // if after 5 seconds content still not loaded => remove the loading screen
        setTimeout(function(){ 
            if($("#load-content").hasClass('active')){
                $("#load-content").removeClass('active'); /*console.log('%cMessages not loaded', 'color: red')*/
            }
        }, 5000);
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

    $rootScope.logout = function() {
        $scope.logoutData = {};
        $scope.logoutData.friendids = $rootScope.adjustElementNewArray($rootScope.friendlist , 0,'userid', 'retreive',0,0,0);;
        $scope.logoutData.authid = $rootScope.Authuserid;
        if($scope.logoutData.friendids.length>0){
            $rootScope.postRequest($scope.logoutData ,'sendLogout', '');
        }        
    }

    // REMOVE LOADING SCREEN WHEN ANGULAR IS LOADED
    $scope.$watch('$viewContentLoaded', function()
    {
        $('.fullscreen-loader').addClass('hide');
    });

    $rootScope.broadcastUser = function(userid) {

        Echo.join(`user.${userid}`)
            .listen('UserEvents', (e) => {
                $scope.$apply(function() {
                    if(e.event === 'grouprequest'){
                        $rootScope.groups.push(e.data);
                        $rootScope.countGroupRequests++;
                    }
                    if(e.event === 'friendrequest'){
                        $rootScope.friendRequests.push(e.data);
                        $rootScope.countFriendRequests--;
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
                    if(e.event === 'sendOffline'){
                        $rootScope.adjustObjectElement($rootScope.friendlist, e.data, 'userid', 'update', 0, 'isOnline', 0);
                    }
                    if(e.event === 'receiveOnline'){
                        $rootScope.adjustObjectElement($rootScope.friendlist, e.data, 'userid', 'update', 1, 'isOnline', 0);
                    }
                    if(e.event === 'unreadmessage'){
                        $rootScope.adjustObjectElement($rootScope.friendlist, e.data, 'chatid', 'increment', 1, 'unread_messages', 0);
                    }                    
                });
            });
    };

    $scope.mobileAndTabletcheck = function() {
      var check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    };

    $scope.sleep = function (milliseconds) {
      var start = new Date().getTime();
      for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
          break;
        }
      }
    }
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
        if($rootScope.FriendsNotInGroup){
            $rootScope.groupFriends.push(data);
            $rootScope.adjustObjectElement($rootScope.FriendsNotInGroup, friendID, 'userid', 'remove', 0, 0, 0, 0);
        }
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

    // REVOKE FRIEND TO GROUP INVITE
    $rootScope.revokeInvite = function (friends, chatid){
        var data = {
            chatid      : chatid,
            userid      : $rootScope.toDeleteUserId,
            friends     : friends
        };
        $rootScope.postRequest(data ,'decline', '');
        $scope.Close();
    }

    // REVOKE FRIEND TO GROUP INVITE
    $rootScope.revokeInvitefromGroup = function (userid){
        var data = {
            chatid      : $rootScope.chatID,
            userid      : userid,
            friends     : $rootScope.groupFriends
        };
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
    $scope.searchFriendLoaded = false;

    // GET FRIENDLIST AND GROUPCHATS
    $scope.friendList = function(response) {
        // All your friends
        // console.log(response.data);
        $rootScope.friendlist = response.data.friends;
        // An array with all your friends => for creating a new group => friends get removed from this array to the newGroup array. (GroupController)
        $rootScope.friendsForGroup = $rootScope.friendlist.slice(0, $rootScope.friendlist.lenght);
        // All your groups (GroupController)
        $rootScope.groups = response.data.groupchats;
        $rootScope.countGroupRequests = ($rootScope.adjustElementNewArray($rootScope.groups, '0','confirmed', 'retreive',0,0,0)).length;
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
        $rootScope.countFriendRequests = $rootScope.friendRequests.length;
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
        $scope.searchFriendLoaded = true;
        setTimeout(function(){ $scope.searchFriendLoaded = false; }, 1);
        
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
    $scope.addFriend = function(friendID,friendrequest,index) {
        var newfriend = {
            newfriend: friendID
        };
        var url = API_URL + "addFriend";
        if($scope.searchedfriends){
            if($scope.searchedfriends[index].removeRequest){
                newfriend.removeRequest = $scope.searchedfriends[index].removeRequest;
                $scope.searchedfriends[index].removeRequest = null;
            }else{
                $scope.searchedfriends[index].removeRequest = 1;
            }
        }
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
                    $rootScope.countFriendRequests--;
                    // TODO loginBroadcast naar 1 persoon
                    $scope.loginBroadcast();
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

    // GIVE USER NICKNAME
    $rootScope.renameFriend = function(newname, chatid) {
        $rootScope.adjustObjectElement($rootScope.friendlist, chatid, 'chatid', 'edit', newname, 'nickname', 0);
        $rootScope.adjustObjectElement($rootScope.messages.items , $rootScope.friendID, 'user_id', 'edit', newname, 'nickname', 0);
        if ($rootScope.chatID === chatid) {
            $rootScope.chatname = newname
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
    $scope.hasChildren = function(list, model){
        return list.filter(function(item){console.log(item.nickname,  $scope.$parent.groupFriendInput);return item.nickname.indexOf(model) !== -1});
    }
    //CREATES A GROUP
    $scope.createGroup = function(){
        var url = API_URL + "createGroup";
        if($scope.newGroup.friends.length>0){
            $http({
                method: 'POST',
                url: url,
                data: $.param($scope.newGroup),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function(response) {
                $rootScope.getFriendChats(); //TODO do this asynchrone front-end
            }, $rootScope.errorCallback);
        
            // remove all friends added to group front-end
            $rootScope.friendsForGroup = $rootScope.friendlist;
            $scope.newGroup.friends = [];
            $('#createGroupsName').val('');
        }
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
app.controller('MessageController', function($scope, $http, API_URL, $rootScope, Messages) {
    $rootScope.message = {};
    $rootScope.message.theme = '1';
    $rootScope.makeBroadcastConnection = false;
    $rootScope.messagesLoaded = 0;
    $scope.currentAmount = 1;

    //UPDATE CHAT
    $scope.successGetMessage = function(response) {
        // $rootScope.messages.items = response.data.messages;
        $rootScope.messagesLoaded = 0;
        $rootScope.messages = new Messages();
        $rootScope.messages.nextPage();
        // console.log($rootScope.messages);
        $rootScope.themes = response.data.themes;
        $rootScope.generalThemeID = $rootScope.adjustElementNewArray($rootScope.themes, 1,'is_general', 'retreive',0,'id',0)[0];
        $rootScope.message.theme = $rootScope.generalThemeID;
        $rootScope.message.profileImage = response.data.profileImage;
        $scope.chatID = $rootScope.chatID;
        if ($rootScope.makeBroadcastConnection) {
            // If you are already in a chatroom. First leave this one. => than make a new broadcast connection.
            if($scope.currentChatroom){
                Echo.leave($scope.currentChatroom);
            }
            $rootScope.makeBroadcastConnection = false;
            $scope.broadcast($scope.chatID);
        }
        // shortcuts
        $rootScope.initShortcut();
        // remove unread messages notifcation
        $scope.readmessages = {};
        $scope.readmessages.chatid = $rootScope.chatID;
        $scope.readmessages.userid = $rootScope.Authuserid;
        $rootScope.postRequest($scope.readmessages ,'readMessages', '');
        
        // remove loadscreen
        $("#load-content").removeClass('active');
    };

    $rootScope.updateChat = function(chatid) {
        $http.get(API_URL + "message" + "/" + chatid)
            .then($scope.successGetMessage, $rootScope.errorCallback);
    };

    //SEND A MESSAGE
    $scope.sendMessage = function(keyEvent) {
        if (keyEvent.which === 13 || keyEvent === 13) {
            $rootScope.message.chatid = $rootScope.chatID;
            // force theme message
            if($rootScope.message.filter){
                $rootScope.message.theme = $rootScope.message.filter
            }else{
                $rootScope.message.theme = $rootScope.generalThemeID;
            }
            var $textInput = $('#message-text');
            // if the text Input is not empty send the message
            if ($textInput.val() != "" && $rootScope.chatID) {
                $rootScope.message.text = $textInput.val();
                $textInput.val('');
                var url = API_URL + "message";

                $http({
                    method: 'POST',
                    url: url,
                    data: $.param($rootScope.message),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(function(response) {
                    $rootScope.postRequest($scope.chatfriends ,'newMessage', '');
                    $scope.scrollDown();
                }, $rootScope.errorCallback);
                $rootScope.message.text = null;
            }
        }
    };

    //BROADCAST CONNECTION
    $scope.broadcast = function(chatid) {
        $scope.currentChatroom = `chatroom.${chatid}`;
        // console.log(`chatroom.${chatid}`);
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
            .listen('EditUsername', (e) => {
                $scope.$apply(function() {
                    $rootScope.adjustArrayFromObject($rootScope.groups, e.userid, 'user_id', 'edit',e.newUsername, 'name', 0, 0);
                })
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
                            $rootScope.adjustObjectElement($rootScope.themes, e.data.id, 'id', 'update', e.data, 0, 0);
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
                        $rootScope.initShortcut();
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

    $rootScope.messageColor = function(color) {
        $rootScope.message.color = color;
        $scope.scrollDown();
        $scope.loadMessages();
        $('#scrollMessages').offset().top;
    }

    // !! TODO !! Danger !! can start to loads All messages ever send => really heavy => maak post call voor theme-messages->paginate()
    // Keep loading messages until you can scroll in the theme messages
    $scope.loadMessages = function(){
        if($('#scrollMessages').offset().top < 100){
            $rootScope.messages.nextPage();
            $rootScope.scrollDown();
            if($('#scrollMessages').offset().top < 100 && $rootScope.messages.itemAmount > $scope.currentAmount){
                $scope.currentAmount = $rootScope.messages.itemAmount;
                $scope.loadMessages();  
            } 
        }
    }

    // on refresh or url change => leave chat channel
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
        this.itemAmount = 1;
    }

    Messages.prototype.nextPage = function() {
        if(this.busy) return;
        if(this.items.length === this.itemAmount) return;
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
        this.itemAmount = this.items.length;
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
        // TODO deze retreive is  slecht geschrven
        $rootScope.groupsNotConfirmed = $rootScope.adjustArrayElementNewArray($rootScope.groups, [$rootScope.friendID, 0], ['user_id', 'confirmed'], 'retreive',0,0,0,1);
        $rootScope.toDeleteUserId = $rootScope.friendID;

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
            if(!$rootScope.friendID){
                if(newChatName){
                    var data = {
                        newname : newChatName,
                        chatid  : $rootScope.chatID,
                        friends : $rootScope.groupFriends
                    };
                    $rootScope.postRequest(data ,'renameChat', '');
                    $rootScope.renameChat(newChatName, $rootScope.chatID);
                }
            }else{
                    var data = {
                        newname : newChatName,
                        chatid  : $rootScope.chatID,
                        friendid : $rootScope.friendID
                    };
                    $rootScope.postRequest(data ,'renameFriend', '');
                    $rootScope.renameFriend(newChatName, $rootScope.chatID);
            }
            if($('#editChatNameInput').hasClass('edit')){
                console.log($('#editChatNameInput .bubble-editButton.clear')[0].click()); //TODO moet ook zonder console werken
                $('#editChatNameInput .bubble-editButton.clear')[0].click();
            }
            $('#chatname-input').val('');
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

    $scope.editUserName = function(){
        $('.js-username').html($scope.user.newUserName);
        $rootScope.adjustArrayFromObject($rootScope.groups, $rootScope.Authuserid, 'user_id', 'edit', $scope.user.newUserName, 'name', 0, 0);
        if($rootScope.chatID){
           $scope.user.chatid = $rootScope.chatID;
        }
        $rootScope.postRequest($scope.user ,'username', '');
    }

    $scope.editUserEmail = function(newEmail){
        $('.js-email').html($scope.user.newUserEmail);
        if($rootScope.chatID){
           $scope.user.chatid = $rootScope.chatID;
        }
        $rootScope.postRequest($scope.user ,'email', '');
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
	// $scope.initvalue = {color :"red", icon:"school",shortcut:"A"}
	$scope.NewTheme = {color :"red", icon:"school",shortcut:"A"};
	$scope.ThemeIcons = ['school','work','star', 'favorite', 'extension' ,'euro_symbol', 'query_builder', 'theaters','build' , 'home', 'videogame_asset', 'brush', 'local_florist', 'terrain' ,  'flight', 'toys', 'wb_sunny', 'healing', 'music_note', 'flash_on', 'photo_camera', 'wb_cloudy', 'directions_car', 'local_bar','local_dining', 'local_hospital',  'hotel', 'local_grocery_store', 'local_shipping', 'beach_access', 'fitness_center', 'casino', 'child_friendly','free_breakfast', 'kitchen', 'ac_unit', 'cake', 'public', 'weekend', 'account_balance', 'pets', 'timeline'];
	$scope.ThemeColors = ['red','orange','blue','purple','green','cyan', 'pink', 'teal'];
	$scope.ThemeShortcuts = ['A','B','C','D','F','G','H','J','I','K','L','M','O','P','Q','R','S','U','V','X','Y','Z', '0','1','2','3','4','5','6','7','8','9'];
	$scope.showEditTheme = 0;

	$scope.toggleEditTheme = function(key){
		$scope.showEditTheme = key;
	}

	$scope.createNewTheme = function(valid, $event){
		if($scope.NewTheme.keywordString && $scope.NewTheme.name){
			$scope.closeForm($event, 'create');
			$scope.NewTheme.chatid = $rootScope.chatID;
			$scope.NewTheme.keywordString = $scope.NewTheme.keywordString.replace(/\s+/g,",").replace(/[^a-zA-Z0-9,@#]/g,'');
			$scope.NewTheme.keywordString = $scope.NewTheme.keywordString.replace(/[^a-zA-Z0-9,@#]/g,''); //sanitize
			if($scope.NewTheme.chatid){
				$rootScope.postRequest($scope.NewTheme ,'NewTheme', '');
				$scope.resetForm($scope.NewTheme);
				$scope.NewTheme = {color :"red", icon:"school",shortcut:"A"};
				$rootScope.initShortcut();
			}
		}
	}

	$scope.editTheme = function(theme, $event){
		if(theme.keywordString && theme.name){
			$scope.closeForm($event, 'edit');
			theme.generalID = $rootScope.generalThemeID;
			$rootScope.postRequest(theme ,'updateTheme', '');
			$rootScope.initShortcut();
		}
	}


	$scope.resetForm = function(form){
	    for (var prop in form) {
	    	form[prop] = null;
	    }
	    $('#createThemeForm input').removeClass('valid');
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

		for ($prop in $rootScope.messages.items) {
			if($rootScope.messages.items[$prop].force_theme === 0){
				for (prop in keywords) {
					// if messages contains a keyword an has not been forced by  a theme => give new theme
					var text = $rootScope.messages.items[$prop].text.toLowerCase();
					if(text.indexOf(keywords[prop].word.toLowerCase()) !== -1){
						$rootScope.messages.items[$prop].theme_id = themeid;
						$rootScope.messages.items[$prop].color = color;
						themeMessages.push($rootScope.messages.items[$prop].id);
					}
				}
			}else if ($rootScope.messages.items[$prop].force_theme === themeid) {
				$rootScope.messages.items[$prop].theme_id = themeid;
				$rootScope.messages.items[$prop].color = color;
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
			if($rootScope.messages.items[$prop].theme_id == themeid){
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

	$rootScope.initShortcut = function (){
		if($scope.shortcuts){
			$(document).off("keydown"); //reset shortcuts
			$rootScope.messageColor(''); //reset messageFilter
		}
		$scope.shortcuts = [];
		var shortcuts = $rootScope.adjustElementNewArray($rootScope.themes , 0,'shortcut', 'retreive',0,0,0);
		$rootScope.themes.forEach( function(element, index) {
			if(element.is_general !== 1 && element.is_active === 1 && element.is_deleted === 0){
				if(element.shortcut){
				    var code = element.shortcut.charCodeAt(0);
				    var msg = "The Key Code for the \""+element.shortcut+"\" character is "+code+".";
				    $scope.shortcut = {};
				    $scope.shortcut.code = code;
				    $scope.shortcut.themeid = element.id;
				    $scope.shortcut.color = element.color;
				    $scope.shortcuts.push($scope.shortcut);
				}
			}
		});
		$scope.useShortcut($scope.shortcuts);
	}

	$scope.useShortcut = function (shortcuts){
		$(document).keydown(function(evt){
			shortcuts.forEach( function(element, index) {
	    		if (evt.keyCode== element.code && (evt.ctrlKey)){
	   				evt.preventDefault();
	   				$scope.$apply(function() {
		    			$rootScope.message.filter = element.themeid;
		    			$rootScope.messageColor(element.color);
	   				});
	    		}
			});
			if (evt.keyCode== 27){
   				evt.preventDefault();
   				$scope.$apply(function() {
	    			$rootScope.message.filter = undefined;
	    			$rootScope.messageColor('');
   				});
    		}
		});
	}

	$scope.closeForm = function(e, action){
        e.stopPropagation();
        var currentElement = $(e.currentTarget);
        if(action === 'edit'){
	        var parent = currentElement.parents('.js-theme-card')
	        var status = parent.find('.js-theme-status');
	        parent.find('.js-toggle-edit-menu').removeClass('exit-theme');
	        parent.removeClass('open');
	        // status message
			status.css('color','#26a69a');
            status.html('<span class="hide-on-small-only">Theme </span> saved');
            status.removeClass('hidden').addClass('fadeout');

        }else if (action === 'create') {
	        var parent = currentElement.parents('.js-slide-menu');
	        parent.find('.js-toggle-slide-menu').removeClass('close');
	        parent.removeClass('open-slider');
        }
	}
})

app.directive("ngMobileClick", [function () {
    return function (scope, elem, attrs) {
        elem.bind("touchstart click", function (e) {
            e.preventDefault();
            e.stopPropagation();

            scope.$apply(attrs["ngMobileClick"]);
        });
    }
}])
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