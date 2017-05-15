app.controller('ThemeController', function($scope, $http, API_URL, $rootScope) {
	$scope.createNewTheme = function(){
		$scope.NewTheme.chatid = $rootScope.chatID;
		$scope.NewTheme.keywordString = $scope.NewTheme.keywordString.replace(/\s+/g,",").replace(/[^a-zA-Z0-9,@#]/g,'');
		$scope.NewTheme.keywordString = $scope.NewTheme.keywordString.replace(/[^a-zA-Z0-9,@#]/g,''); //sanitize
		if($scope.NewTheme.chatid){
			$rootScope.postRequest($scope.NewTheme ,'NewTheme', '');
			$scope.resetForm($scope.NewTheme);
		}
	}

	$scope.editTheme = function(theme){
		theme.generalID = $rootScope.generalThemeID;
		$rootScope.postRequest(theme ,'updateTheme', '');
	}


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

	$rootScope.updateMessages = function(keywords, color, themeid){
		var themeMessages = []
		// check if themeid is passed to this function
		// if (keywords[prop].theme_id) {
		// 	themeid = keywords[prop].theme_id;
		// }

		for ($prop in $rootScope.messages) {
			if($rootScope.messages[$prop].force_theme === 0){
				for (prop in keywords) {
					// if messages contains a keyword an has not been forced by  a theme => give new theme
					if($rootScope.messages[$prop].text.indexOf(keywords[prop].word) !== -1){
						$rootScope.messages[$prop].theme_id = themeid;
						$rootScope.messages[$prop].color = color;
						themeMessages.push($rootScope.messages[$prop].id);
					}
				}
			}
		}
		for ($prop in $rootScope.messages) {
			// if messages contains none of the keywords but has the themeID => remove the theme from it
			if ($rootScope.messages[$prop].theme_id == themeid && themeMessages.indexOf($rootScope.messages[$prop].id) === -1 && $rootScope.messages[$prop].force_theme === 0) {
				$rootScope.messages[$prop].theme_id = $rootScope.generalThemeID;
				$rootScope.messages[$prop].color = "white";
			}
		}
	}

	$rootScope.removeThemeFromMessages = function(themeid){
		for ($prop in $rootScope.messages) {
			if($rootScope.messages[$prop].theme_id == themeid && $rootScope.messages[$prop].force_theme === 0){
				$rootScope.messages[$prop].theme_id = $rootScope.generalThemeID;
				$rootScope.messages[$prop].color = "white";
			}
		}
	}

	$rootScope.updateThemeUsage = function(){
		var countThemes = {};
		for (prop in $rootScope.messages) {
			if($rootScope.messages[prop].theme_id != $rootScope.generalThemeID){
				var id = $rootScope.messages[prop]['theme_id'];
				countThemes[id]++;
				if(isNaN(countThemes[id])){
					countThemes[id] = 1;
				}
			}
		}
		var amountMessages = Object.keys($rootScope.messages).length;
		if(!amountMessages){
			amountMessages = $rootScope.messages.length;
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
})