app.controller('ThemeController', function($scope, $http, API_URL, $rootScope) {
	$scope.createNewTheme = function(){
		console.log($scope.NewTheme);
		$rootScope.postRequest($scope.NewTheme ,'NewTheme', '');
	}
})