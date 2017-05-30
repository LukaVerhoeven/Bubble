<div id="themes" class="col s12 tab-item bottom-gutter-double" ng-controller="ThemeController">
<div class="top-gutter-double margin-div col s12">
	<!-- All themes -->
	<div class="card no-margin-top theme-card js-theme-card" ng-repeat="(key, theme) in themes" ng-if="!theme.is_general && theme.is_active && !theme.is_deleted">
		<div class="theme-line">
			<div class="left-side">
				<i class="bubble-icon friend @{{theme.color}}-text background waves-effect waves-light"><i class="material-icons white-text">@{{theme.icon}}</i></i>
				<h2 class="left-align inline-block truncate">@{{theme.name}}</h2>
			</div>
			<div class="right right-side">
				<p class="theme-status js-theme-status right-align truncate first-letter-capital"></p>
				<a class="btn-floating btn @{{theme.color}} js-toggle-edit-menu edit-theme">
		     	 	<i class="material-icons">mode_edit</i>
		     	 	<i class="material-icons">clear</i>
		    	</a>
			</div>
		</div>
		<div class="theme-line">
			<div class="left left-side">
     	 		<i class="bubble-icon key waves-effect waves-light @{{theme.color}}-text"></i>
				<p class="keywords inline-block truncate" >@{{theme.keywordString}}</p>
			</div>
			<div class="right-side">
				<p class="inline-block right shortcut"><span class="hide-on-small-only">Shortcut: </span>Ctrl + @{{theme.shortcut}}</p>
			</div>
		</div>
		<div>
			
		</div>
		@include('components.theme-form', ['model' => 'theme', 'action' => 'update'])
	</div>
	<!-- New theme -->
	@include('components.theme-form', ['model' => 'NewTheme', 'action' => 'create'])
 
</div>		
</div>