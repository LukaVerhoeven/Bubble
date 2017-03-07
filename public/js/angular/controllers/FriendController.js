app.controller('FriendController',function($scope, $http, API_URL, $rootScope){

  $scope.newFriendInput = '';

  //ERROR
  $scope.errorCallback = function (error){
      // console.log(error);
      console.log("wrong call made");
  }

  //GET FRIENDLIST
  $scope.friendList = function(response){
      $scope.friendlist = response.data;
      console.log(response.data);
  }

  $scope.getFriendChats = function(){
    $http.get(API_URL + "getChatRooms")
    .then($scope.friendList, $scope.errorCallback);
  }

  $scope.getFriendChats();

  //SEARCH NEW FRIENDS
  $scope.newfriendsearch = function (response){
      $scope.searchedfriends = response.data;
      // console.log($scope.searchedfriends);
  }

  //TODO: keypress api request--> niet te belastent voor de server? database?
  $scope.updateFriendSearch = function(){
    //TODO: dont display friends and yourself
    $http.get(API_URL + "searchNewFriend")
    .then($scope.newfriendsearch, $scope.errorCallback);
  }

  //ADD NEW FRIEND
  $scope.addFriend = function(friendID){
    var newfriend = {newfriend : friendID};
    var url = API_URL + "addFriend";
    $http({
      method: 'POST',
      url: url,
      data: $.param(newfriend),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(function (response) {
      if (response.data[0] === true) {
        console.log(response.data[1]); // = friendship is confirmed
        $scope.getFriendChats();
      }
    }, $scope.errorCallback);

  }

  //ENTER A CHAT
  $scope.openChat = function (chatID , friendName){
    $rootScope.chatname = friendName;
    $rootScope.chatID = chatID;
  }
})

