app.controller('ThemeController', function($scope, $http, API_URL, $rootScope) {
	$scope.createNewTheme = function(){
		$scope.NewTheme.chatid = $rootScope.chatID;
		if($scope.NewTheme.chatid){
			$rootScope.postRequest($scope.NewTheme ,'NewTheme', '');
			// $scope.resetForm($scope.NewTheme);
		}
		console.log($rootScope.themes);
	}

	$scope.editTheme = function(theme){
		$rootScope.postRequest(theme ,'updateTheme', '');
	}

// TODO maak loading screen ( i am creating your theme)
// geen theme->id dus kan functie niet gberuiken ( maar wel leerijke functie dus ni weg doen)
	// $scope.pushNewTheme = function (newCreatedTheme){
	// 	var newTheme = JSON.parse(JSON.stringify(newCreatedTheme)); //Create unique new object
	// 	newTheme.themeUsage = "0%";
	// 	newTheme.is_active = 1;
	// 	newTheme.is_deleted = 0;
	// 	newTheme.is_general = 0;
	// 	newTheme.keywordString = newTheme.keywordString.replace(/\s+/g, ',').toLowerCase();
	// 	var filteredString = newTheme.keywordString.split(",").filter(function(e){return e}).join(',');
	// 	var objectString = filteredString.replace(/^/, '[{word:"').replace(/,/g, '"},{word:"').concat('"}]');
	// 	var newJson = objectString.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
	// 	newJson = newJson.replace(/'/g, '"');
	// 	newTheme.keywords = JSON.parse(newJson);
	// 	$rootScope.themes.push(newTheme);
	// }

	$scope.resetForm = function(form){
	    for (var prop in form) {
	    	form[prop] = null;
	    }
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
})