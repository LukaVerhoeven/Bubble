app.controller('ThemeController', function($scope, $http, API_URL, $rootScope) {
	// $scope.initvalue = {color :"red", icon:"school",shortcut:"A"}
	$scope.form = {};
	$scope.NewTheme = {color :"red", icon:"school",shortcut:"A"};
	$scope.ThemeIcons = ['school','work','star', 'favorite', 'extension' ,'euro_symbol', 'query_builder', 'theaters','build' , 'home', 'videogame_asset', 'brush', 'local_florist', 'terrain' ,  'flight', 'toys', 'wb_sunny', 'healing', 'music_note', 'flash_on', 'photo_camera', 'wb_cloudy', 'directions_car', 'local_bar','local_dining', 'local_hospital',  'hotel', 'local_grocery_store', 'local_shipping', 'beach_access', 'fitness_center', 'casino', 'child_friendly','free_breakfast', 'kitchen', 'ac_unit', 'cake', 'public', 'weekend', 'account_balance', 'pets', 'timeline'];
	$scope.ThemeColors = ['red','orange','blue','purple','green','cyan', 'pink', 'teal'];
	$scope.ThemeShortcuts = ['A','B','C','D','F','G','H','J','I','K','L','M','O','P','Q','R','S','U','V','X','Y','Z', '0','1','2','3','4','5','6','7','8','9'];
	$scope.showEditTheme = 0;
	$scope.openCreate = false;

	$rootScope.toggleEditTheme = function(index){
		$scope.showEditTheme = index;
	}

	$rootScope.toggleCreate = function(){
		if($scope.openCreate){
			setTimeout(function(){ $scope.openCreate = !$scope.openCreate; }, 500); //transition animatie
		}else {
			$scope.openCreate = !$scope.openCreate;
		}

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
				$rootScope.toggleCreate();
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
	    console.log($scope.form);
	    $scope.form.createThemeForm.$setPristine();
	    $scope.form.createThemeForm.$setUntouched();
	}

	$rootScope.keywordToObjectArray = function(keywords){
		if(keywords.length>0){
	        var keywordString = keywords.join(',');
	        var objectString = keywordString.replace(/^/, '[{word:"').replace(/,/g, '"},{word:"').concat('"}]');
	        objectString = objectString.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
	        objectString = objectString.replace(/'/g, '"');
	        objectString = objectString.replace(/[\u0000-\u0019]+/g,""); // remove invisible symbols
	        objectString = JSON.parse(objectString);
	        return objectString;
		}
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