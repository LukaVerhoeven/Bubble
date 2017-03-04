app.controller('MessageController',function($scope, $http, API_URL , $rootScope){
  $scope.message = {};
  $scope.message.theme = 'general';

  //ERROR
  $scope.errorCallback = function (error){
      // console.log(error);
      console.log("wrong call made");
  }

  //UPDATE CHAT
  $scope.successGetMessage = function (response){
      $scope.messages = response.data.messages;
      $scope.chatID = response.data.chatID;
      console.log($scope.chatID);
  }
  
  $scope.update = function($id){
    $http.get(API_URL + "message" + "/" + $id)
    .then($scope.successGetMessage, $scope.errorCallback);
  }

  //SEND A MESSAGE
  $scope.sendMessage = function(keyEvent) {
    var url = API_URL + "message/" + $scope.chatID;
    //TODO: if id = null --> fix it ;
    if (keyEvent.which === 13){
       $http({
        method: 'POST',
        url: url,
        data: $.param($scope.message),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function(response){
        // console.log(response); 
        $('#message-text').val('');
        $scope.update($scope.chatID);
      },$scope.errorCallback);
    }
  }

  //OPEN CHAT
  $scope.$watch(function() {
    return $rootScope.friendID;
  }, function() {
    if ($rootScope.friendID) {
        $scope.update($rootScope.friendID);
    }
  }, true);


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

