<div id="themes" class="col s12 tab-item bottom-gutter-double" ng-controller="ThemeController">
<div class="top-gutter-double margin-div col s12">
	<!-- All themes -->
	<div class="card no-margin-top">
	<div>
		<i>Theme-icon</i>
		<h2 class="left-align inline-block">name</h2>
		<a class="btn-floating btn red right">
     	 	<i class="material-icons ">mode_edit</i>
    	</a>
	</div>
	<div>
		<i>key-icon</i>
		<p class="inline-block">keywords</p>
		<p class="inline-block right">shortcut</p>
	</div>

	</div>
	<!-- New theme -->
	<div class="card top-gutter-double-margin">
		<div>
			<h2 class="inline-block">Create new theme</h2>
			<a class=" right">
	     	 	<i class="material-icons grey-text text-darken-3">keyboard_arrow_up</i>
	    	</a>
		</div>
		<form class="row" ng-submit="createNewTheme(NewTheme.$valid)">
	        <div class="input-field col s12">
				<input placeholder="Ex: Sport" id="theme_name" type="text" ng-model="NewTheme.Theme" class="validate" autocomplete="off" required>
				<label for="theme_name" class="">Theme name</label>
	        </div>
	        <div class="input-field col s12">
				<input placeholder="Ex: tennis, running, racket" id="keywords" type="text" ng-model="NewTheme.Keywords" class="validate" autocomplete="off" required>
				<label for="keywords" class="">Keywords</label>
	        </div>
	        <div class="input-field col s12 new-theme-color">
				<p class="inline-block col s1">Color</p>
				<ul class="col s11">
					@foreach (['red','orange','blue','purple','green','cyan'] as $color)
					  	<li>
					      <input name="color" type="radio" id="{{$color}}" ng-model="NewTheme.Color" value="{{$color}}" required/>
					      <label class="{{$color}}-radio" for="{{$color}}"></label>
					    </li>
					@endforeach
				</ul>
	        </div>
	        <div class="input-field col s12 new-theme-icon">
				<p class="inline-block col s1">Icon</p>
				<div class="col s11">
					<div class="inline-block ">
						@foreach (['school','work','star'] as $icon)
							<div class="btn-floating btn white inline-block js-parent-selector">
								<input name="icon" type="radio" id="{{$icon}}" ng-model="NewTheme.Icon" value="{{$icon}}" required/>
								<label for="{{$icon}}" class="no-button js-NIcon"></label>
					     	 	<i class="material-icons btn-floating waves-effect waves-light @{{NewTheme.Color}} @{{NewTheme.Color}}-text">{{$icon}}</i>
					    	</div>
						@endforeach
					</div>
				</div>
	        </div>
	        <div class="input-field col s12 new-theme-shortcut">
				<p class="inline-block col s2">Shortcut: Ctrl+</p>
				<div class="col s10">
					<div class="inline-block">
						@foreach (range('A', 'Z') as $char)
						    <div class="inline-block new-shortcut left">
								<input name="schortcut" type="radio" id="ctrl-{{ $char }}" ng-model="NewTheme.Schortcut" value="{{ $char }}" required/>
								<label for="ctrl-{{ $char }}" class="no-button"></label>
					     	 	<a class="waves-effect waves-light btn @{{NewTheme.Color}} @{{NewTheme.Color}}-text">{{ $char }}</a>
					    	</div>
						@endforeach
						@foreach (range('0', '9') as $number)
						    <div class="inline-block new-shortcut left">
								<input name="schortcut" type="radio" id="ctrl-{{ $number }}" ng-model="NewTheme.Schortcut" value="{{ $number }}" />
								<label for="ctrl-{{ $number }}" class="no-button"></label>
								<a class="waves-effect waves-light btn @{{NewTheme.Color}} @{{NewTheme.Color}}-text">{{ $number }}</a>
					    	</div>
						@endforeach
					</div>
				</div>
	        </div>
	        <div class="col s12 center">
	        <input type="submit" class="waves-effect waves-light btn red inline-block" value="Create theme">
	        	{{-- <a class="waves-effect waves-light btn red inline-block" ng-click="createNewTheme()">Create theme</a>     --}}
	        </div>
		</form>
	</div>
</div>		
</div>