<div id="themes" class="col s12 tab-item bottom-gutter-double" ng-controller="ThemeController">
<div class="top-gutter-double margin-div col s12 js-theme-container">
	<!-- All themes -->
	<div class="card no-margin-top theme-card js-theme-card" ng-repeat="(key, theme) in themes track by theme.id" ng-if="!theme.is_general && theme.is_active && !theme.is_deleted">
		<div class="theme-line">
			<div class="left-side">
				<i class="bubble-icon friend @{{theme.color}}-text background waves-effect waves-light"><i class="material-icons white-text">@{{theme.icon}}</i></i>
				<h2 class="left-align inline-block truncate">@{{theme.name}}</h2>
			</div>
			<div class="right right-side">
				<p class="theme-status js-theme-status right-align truncate first-letter-capital"></p>
				<div class="btn-floating btn @{{theme.color}} js-toggle-edit-menu edit-theme" ng-click="toggleEditTheme(key)">
		     	 	<i class="material-icons">mode_edit</i>
		     	 	<i class="material-icons">clear</i>
		    	</div>
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
		<!-- @include('components.theme-form', ['model' => 'theme', 'action' => 'update']) -->
				<div class="js-edit-form edit-form top-gutter-double-margin js-slide-menu" ng-show="showEditTheme == key">	
					<form class="row" ng-submit="editTheme(theme, $event)" >
				        <div class="input-field col s12">
							<input placeholder="Ex: Sport" id="@{{key}}theme_name" type="text" ng-model="theme.name" class="validate" autocomplete="off" required>
							<label for="@{{key}}theme_name" class="active">Theme name</label>
				        </div>
				        <div class="input-field col s12">
							<input placeholder="Ex: tennis, running, racket" id="@{{key}}keywords" type="text" ng-model="theme.keywordString" class="validate" autocomplete="off" required>
							<label for="@{{key}}keywords" class="active">Keywords</label>
				        </div>
				        <div class="input-field col s12 new-theme-color">
							<p class="inline-block col s1 hide-on-small-only">Color</p>
							<ul class="col s11 center-align">
							  	<li ng-repeat="color in ::ThemeColors">
							      <input name="color" type="radio" id="@{{key+color}}" ng-model="theme.color" value="@{{::color}}" required/>
							      <label class="@{{::color}}-radio @{{::color}}-before" for="@{{key+color}}"></label>
							    </li>
							</ul>
				        </div>
				        <div class="input-field col s12 new-theme-icon">
							<p class="inline-block col s1 hide-on-small-only">Icon</p>
							<div class="col s11 center-align">
								<div class="inline-block">
									<div class="btn-floating btn white inline-block js-parent-selector" ng-repeat="icon in ::ThemeIcons">
										<input name="icon" type="radio" id="@{{key+icon}}" ng-model="theme.icon" value="@{{::icon}}" required/>
										<label for="@{{key+icon}}" class="no-button js-NIcon"></label>
										<i class="material-icons btn-floating waves-effect waves-light @{{theme.color}} @{{theme.color}}-text">@{{::icon}}</i>
							    	</div>
								</div>
							</div>
				        </div>
				        <div class="input-field col s12 new-theme-shortcut">
							<p class="inline-block col s1 hide-on-small-only">Shortcut: </p>
							<div class="col s11 center-align">
								<div class="inline-block all-letters @{{theme.color}} waves-effect waves-light">
								    <div class="inline-block new-shortcut" ng-repeat="char in ::ThemeShortcuts">
										<input name="schortcut" type="radio" id="@{{key+char }}" ng-model="theme.shortcut" value="@{{ ::char }}" required/>
										<label for="@{{key+char }}" class="no-button"></label>
										<a class="waves-effect waves-light btn @{{theme.color}} @{{theme.color}}-border @{{theme.color}}-text">@{{ ::char }}</a>
							    	</div>
								</div>
							</div>
				        </div>
				        <div class="col s12 center">

				        <input type="submit" class="submit-theme waves-effect waves-light btn red inline-block" value="update theme">
				        	{{-- <a class="waves-effect waves-light btn red inline-block" ng-click="createNewTheme()">Create theme</a>     --}}
				        </div>
					</form>
				</div>		
	</div>
	<!-- New theme -->
	<!-- @include('components.theme-form', ['model' => 'NewTheme', 'action' => 'create']) -->
	<div class="card top-gutter-double-margin new-theme js-slide-menu theme-card">
		<div class="js-toggle-slide-menu" ng-click="toggleCreate()">
			<h2 class="inline-block">Create new theme</h2>
			<a class="right arrow-toggle">
	     	 	<i class="material-icons grey-text text-darken-3 js-toggle-slide-menu close" ng-click="toggleCreate()">keyboard_arrow_up</i>
	    	</a>
		</div>
		<form class="row" ng-submit="createNewTheme(NewTheme.$valid, $event)" id="createThemeForm" name="form.createThemeForm" ng-if="openCreate">
	        <div class="input-field col s12">
				<input placeholder="Ex: Sport" id="@{{key}}theme_name" type="text" ng-model="NewTheme.name" class="validate" autocomplete="off" required>
				<label for="@{{key}}theme_name" class="active">Theme name</label>
	        </div>
	        <div class="input-field col s12">
				<input placeholder="Ex: tennis, running, racket" id="@{{key}}keywords" type="text" ng-model="NewTheme.keywordString" class="validate" autocomplete="off" required>
				<label for="@{{key}}keywords" class="active">Keywords</label>
	        </div>
	        <div class="input-field col s12 new-theme-color">
				<p class="inline-block col s1 hide-on-small-only">Color</p>
				<ul class="col s11 center-align">
				  	<li ng-repeat="color in ::ThemeColors">
				      <input name="color" type="radio" id="@{{key+color}}" ng-model="NewTheme.color" value="@{{::color}}" required/>
				      <label class="@{{::color}}-radio @{{::color}}-before" for="@{{key+color}}"></label>
				    </li>
				</ul>
	        </div>
	        <div class="input-field col s12 new-theme-icon">
				<p class="inline-block col s1 hide-on-small-only">Icon</p>
				<div class="col s11 center-align">
					<div class="inline-block">
						<div class="btn-floating btn white inline-block js-parent-selector" ng-repeat="icon in ::ThemeIcons">
							<input name="icon" type="radio" id="@{{key+icon}}" ng-model="NewTheme.icon" value="@{{::icon}}" required/>
							<label for="@{{key+icon}}" class="no-button js-NIcon"></label>
							<i class="material-icons btn-floating waves-effect waves-light @{{NewTheme.color}} @{{NewTheme.color}}-text">@{{icon}}</i>
				    	</div>
					</div>
				</div>
	        </div>
	        <div class="input-field col s12 new-theme-shortcut">
				<p class="inline-block col s1 hide-on-small-only">Shortcut: </p>
				<div class="col s11 center-align">
					<div class="inline-block all-letters  @{{NewTheme.color}} waves-effect waves-light" >
					    <div class="inline-block new-shortcut" ng-repeat="char in ::ThemeShortcuts">
							<input name="schortcut" type="radio" id="@{{key+char }}" ng-model="NewTheme.shortcut" value="@{{ ::char }}" required/>
							<label for="@{{key+char }}" class="no-button"></label>
							<a class="waves-effect waves-light btn @{{NewTheme.color}} @{{NewTheme.color}}-border @{{NewTheme.color}}-text">@{{ char }}</a>
				    	</div>
					</div>
				</div>
	        </div>
	        <div class="col s12 center">

	        <input type="submit" class="submit-theme waves-effect waves-light btn red inline-block" value="update theme">
	        	{{-- <a class="waves-effect waves-light btn red inline-block" ng-click="createNewTheme()">Create theme</a>     --}}
	        </div>
		</form>
	</div>		
 
</div>		
</div>