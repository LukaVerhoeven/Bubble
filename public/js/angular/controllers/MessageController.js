app.controller('MessageController',function($scope, $http, API_URL , $rootScope){
  $scope.message = {};
  $scope.message.theme = '1';
  $scope.makeBroadcastConnection = false;

  //ERROR
  $scope.errorCallback = function (error){
      // console.log(error);
      console.log("wrong call made");
  }



  //UPDATE CHAT
  $scope.successGetMessage = function (response){
      $scope.messages = response.data;
      $scope.chatID = $rootScope.chatID;
      console.log($scope.messages );
      if ($scope.makeBroadcastConnection) {
          $scope.makeBroadcastConnection = false;
          $scope.broadcast($scope.chatID);
      }
  }
  
  $scope.update = function($id){
    $http.get(API_URL + "message" + "/" + $id)
    .then($scope.successGetMessage, $scope.errorCallback);
  }

  //SEND A MESSAGE
  $scope.sendMessage = function(keyEvent) {
    //TODO: if id = null --> fix it ;
    console.log(keyEvent);
    if (keyEvent.which === 13){
      $('#message-text').val('');
      var url = API_URL + "message/" + $scope.chatID;
    

       $http({
        method: 'POST',
        url: url,
        data: $.param($scope.message),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function(response){
        //push the message to messages collection
        // $scope.messages.push({
        //     text: $scope.message.text,
        //     theme_id: $scope.message.theme
        // });
      },$scope.errorCallback);
    }
  }

  //OPEN CHAT
  $rootScope.$watch(function() {
    return $rootScope.chatID;
  }, function() {
    if ($rootScope.chatID) {
      console.log($rootScope.chatID);
        $scope.makeBroadcastConnection = true;
        $scope.update($rootScope.chatID); 

    }
  }, true);

  //BROADCAST CONNECTION
  $scope.broadcast = function(chatid) {
    var chatroom = 'chatroom'+ chatid;
    Echo.join(chatroom)
      .here((users)=>{
        // console.log(users);
          // this.usersInRoom = users;
      })
      .joining((user)=>{
        console.log(user);
          // this.usersInRoom.push(user);
      })
      .leaving((user)=>{
          // this.usersInRoom = this.usersInRoom.filter(u => u != user);
      })
      .listen('UpdateChat',(e)=>{
          console.log(e)
          $scope.messages.push(e.message); // TODO=> dit is beter maar angularjs negeert updates van broadcastevents
          $scope.update(chatid);
      });
};


//   $scope.toggle = function (modalstate, id) {
//     $scope.modalstate = modalstate;
//     switch (modalstate) {
//       case 'add':
//         $scope.form_title = "Add New Message";
//         break;
//       case 'edit':
//         $scope.form_title = "Message Detail";
//         $scope.id = id;
//         $http.get(API_URL + 'message/' + id).then($scope.successEditMessage , $scope.errorCallback);
//         break;
//       default:
//         break;

//     }
//     // console.log(id);
//     $("#myModal").modal('show');
//   }
//   $scope.successEditMessage = function (response){
//       console.log(response);
//       $scope.message = response.data;
//   }

//   $scope.save = function(modalstate, id){
//     var url = API_URL + "message";
//     if (modalstate === 'edit') {
//       url += "/" + id;
//     }
//     $http({
//       method: 'POST',
//       url: url,
//       data: $.param($scope.message),
//       headers: {'Content-Type': 'application/x-www-form-urlencoded'}
//     }).then(function(response){
//       console.log(response);
//       $("#myModal").modal('hide');
//       $scope.update();
//     },$scope.errorCallback);
//   }

// $scope.confirmDelete = function (id) {
//   var isConfirmDelete = confirm('Are you sure you want to delete this message?')
//   if (isConfirmDelete) {
//     $http({
//       method: 'DELETE',
//       url: API_URL + 'message/'+ id
//     }).then(function(data){
//       console.log(data);
//       location.reload();
//     }, function(data){
//       console.log(data);
//       console.log('unable to delete');
//     })
//   }
//   else {
//     return false;
//   }
// }

})

