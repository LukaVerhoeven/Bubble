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