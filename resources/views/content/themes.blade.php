<div id="themes" class="col s12 tab-item bottom-gutter-double" ng-controller="ThemeController">
<div class="top-gutter-double margin-div col s12">
	<!-- All themes -->
	<div class="card no-margin-top theme-card js-theme-card" ng-repeat="(key, theme) in themes" ng-if="!theme.is_general && theme.is_active && !theme.is_deleted">
		<div class="theme-line">
			<i class="bubble-icon friend @{{theme.color}}-text background waves-effect waves-light"><i class="material-icons white-text">@{{theme.icon}}</i></i>
			<h2 class="left-align inline-block">@{{theme.name}}</h2>
			<div class="right">
				<p class="theme-status js-theme-status"></p>
				<a class="btn-floating btn @{{theme.color}} js-toggle-edit-menu edit-theme">
		     	 	<i class="material-icons">mode_edit</i>
		     	 	<i class="material-icons">clear</i>
		    	</a>
			</div>
		</div>
		<div class="theme-line">
     	 	<i class="bubble-icon key waves-effect waves-light @{{theme.color}}-text"></i>
			<p class="keywords inline-block" >@{{theme.keywordString}}</p>
			<p class="inline-block right shortcut">Shortcut: Ctrl + @{{theme.shortcut}}</p>
		</div>
		<div>
			
		</div>
		@include('components.theme-form', ['model' => 'theme', 'action' => 'update', 'submit' => 'js-submit-edit-form'])
	</div>
	<!-- New theme -->
	@include('components.theme-form', ['model' => 'NewTheme', 'action' => 'create', 'submit' =>'js-toggle-slide-menu'])
 
</div>		
</div>