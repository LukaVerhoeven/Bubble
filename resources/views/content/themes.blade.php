<div id="themes" class="col s12 tab-item bottom-gutter-double" ng-controller="ThemeController">
<div class="top-gutter-double margin-div col s12">
	<!-- All themes -->
	<div class="card no-margin-top theme-@{{key}}" ng-repeat="(key, theme) in themes" ng-if="!theme.is_general && theme.is_active && !theme.is_deleted">
		<div>
			<div class="btn-floating waves-effect waves-light @{{theme.color}}">
	     	 	<i class="material-icons ">@{{theme.icon}}</i>
	    	</div>
			<h2 class="left-align inline-block">@{{theme.name}}</h2>
			<a class="btn-floating btn @{{theme.color}} right js-toggle-edit-menu" data-key="@{{key}}">
	     	 	<i class="material-icons">mode_edit</i>
	    	</a>
		</div>
		<div>
			<div class="btn-floating waves-effect waves-light @{{theme.color}}">
	     	 	<i class="material-icons ">vpn_key</i>
	    	</div>
	    	<div class="keywords inline-block">
				<p class="inline-block" ng-repeat="keyword in theme.keywords">@{{keyword.word}}, </p>
	    	</div>
			<p class="inline-block right">Shortcut: @{{theme.shortcut}}</p>
		</div>
		<div>
			
		</div>
		@include('components.theme-form', ['model' => 'theme', 'action' => 'update', 'hide' => 'hide', 'id'])
	</div>
	<!-- New theme -->
	@include('components.theme-form', ['model' => 'NewTheme', 'action' => 'create', 'hide' =>''])
 
</div>		
</div>