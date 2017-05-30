@if($action === 'create')
	<div class="card top-gutter-double-margin new-theme js-slide-menu theme-card">
		<div class="js-toggle-slide-menu">
			<h2 class="inline-block">Create new theme</h2>
			<a class="right arrow-toggle">
	     	 	<i class="material-icons grey-text text-darken-3 js-toggle-slide-menu">keyboard_arrow_up</i>
	    	</a>
		</div>
	<form class="row" ng-submit="createNewTheme({{$model}}.$valid, $event)" id="createThemeForm" name="createThemeForm">
@else
<div class="js-edit-form edit-form top-gutter-double-margin js-slide-menu">	
	<form class="row" ng-submit="editTheme(theme, $event)" >
@endif
        <div class="input-field col s12">
			<input placeholder="Ex: Sport" id="@{{key}}theme_name" type="text" ng-model="{{$model}}.name" class="validate" autocomplete="off" required>
			<label for="@{{key}}theme_name" class="active">Theme name</label>
        </div>
        <div class="input-field col s12">
			<input placeholder="Ex: tennis, running, racket" id="@{{key}}keywords" type="text" ng-model="{{$model}}.keywordString" class="validate" autocomplete="off" required>
			<label for="@{{key}}keywords" class="active">Keywords</label>
        </div>
        <div class="input-field col s12 new-theme-color">
			<p class="inline-block col s1">Color</p>
			<ul class="col s11 center-align">
				@foreach (['red','orange','blue','purple','green','cyan', 'pink', 'teal'] as $color)
				  	<li>
				      <input name="@{{key}}color" type="radio" id="@{{key}}{{$color}}" ng-model="{{$model}}.color" value="{{$color}}" required/>
				      <label class="{{$color}}-radio {{$color}}-before" for="@{{key}}{{$color}}"></label>
				    </li>
				@endforeach
			</ul>
        </div>
        <div class="input-field col s12 new-theme-icon">
			<p class="inline-block col s1">Icon</p>
			<div class="col s11 center-align">
				<div class="inline-block">
					@foreach (['school','work','star', 'favorite', 'extension' ,'euro_symbol', 'query_builder', 'theaters','build' , 'home', 'videogame_asset', 'brush', 'local_florist', 'terrain' ,  'flight', 'toys', 'wb_sunny', 'healing', 'music_note', 'flash_on', 'photo_camera', 'wb_cloudy', 'directions_car', 'local_bar','local_dining', 'local_hospital',  'hotel', 'local_grocery_store', 'local_shipping', 'beach_access', 'fitness_center', 'casino', 'child_friendly','free_breakfast', 'kitchen', 'ac_unit', 'cake', 'public', 'weekend', 'account_balance', 'pets', 'timeline'] as $icon)
						<div class="btn-floating btn white inline-block js-parent-selector">
							<input name="@{{key}}icon" type="radio" id="@{{key}}{{$icon}}" ng-model="{{$model}}.icon" value="{{$icon}}" required/>
							<label for="@{{key}}{{$icon}}" class="no-button js-NIcon"></label>
							@if($action === 'create')
				     	 	<i class="material-icons btn-floating waves-effect waves-light @{{NewTheme.color}} @{{NewTheme.color}}-text">{{$icon}}</i>
							@else
							<i class="material-icons btn-floating waves-effect waves-light @{{theme.color}} @{{theme.color}}-text">{{$icon}}</i>
				     	 	@endif
				    	</div>
					@endforeach
				</div>
			</div>
        </div>
        <div class="input-field col s12 new-theme-shortcut">
			<p class="inline-block col s1">Shortcut: </p>
			<div class="col s11 center-align">
				@if($action === 'create')
				     <div class="inline-block all-letters  @{{NewTheme.color}} waves-effect waves-light" >
	     	 	@else
					<div class="inline-block all-letters @{{theme.color}} waves-effect waves-light">
	     	 	@endif
					@foreach ($shortcuts as $char)
					    <div class="inline-block new-shortcut">
							<input name="@{{key}}schortcut" type="radio" id="@{{key}}ctrl-{{ $char }}" ng-model="{{$model}}.shortcut" value="{{ $char }}" required/>
							<label for="@{{key}}ctrl-{{ $char }}" class="no-button"></label>
							@if($action === 'create')
				     	 		<a class="waves-effect waves-light btn @{{NewTheme.color}} @{{NewTheme.color}}-border @{{NewTheme.color}}-text">{{ $char }}</a>
				     	 	@else
								<a class="waves-effect waves-light btn @{{theme.color}} @{{theme.color}}-border @{{theme.color}}-text">{{ $char }}</a>
				     	 	@endif
				    	</div>
					@endforeach
				</div>
			</div>
        </div>
        <div class="col s12 center">

        <input type="submit" class="submit-theme waves-effect waves-light btn red inline-block" value="{{ $action }} theme">
        	{{-- <a class="waves-effect waves-light btn red inline-block" ng-click="createNewTheme()">Create theme</a>     --}}
        </div>
	</form>
</div>