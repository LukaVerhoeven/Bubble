<div class="card top-gutter-double-margin new-theme js-slide-menu js-open-slide-menu {{$hide}}">
	@if($action === 'create')
	<div>
		<h2 class="inline-block">Create new theme</h2>
		<a class=" right">
     	 	<i class="material-icons grey-text text-darken-3 js-toggle-slide-menu">keyboard_arrow_up</i>
    	</a>
	</div>
	<form class="row" ng-submit="createNewTheme({{$model}}.$valid)" id="createThemeForm" name="createThemeForm">
	@else
	<form class="row" ng-submit="editTheme(theme)" >
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
			<ul class="col s11">
				@foreach (['red','orange','blue','purple','green','cyan'] as $color)
				  	<li>
				      <input name="@{{key}}color" type="radio" id="@{{key}}{{$color}}" ng-model="{{$model}}.color" value="{{$color}}" required/>
				      <label class="{{$color}}-radio" for="@{{key}}{{$color}}"></label>
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
			<p class="inline-block col s2">Shortcut: Ctrl+</p>
			<div class="col s10">
				<div class="inline-block">
					@foreach (range('A', 'Z') as $char)
					    <div class="inline-block new-shortcut left">
							<input name="@{{key}}schortcut" type="radio" id="@{{key}}ctrl-{{ $char }}" ng-model="{{$model}}.shortcut" value="{{ $char }}" required/>
							<label for="@{{key}}ctrl-{{ $char }}" class="no-button"></label>
							@if($action === 'create')
				     	 		<a class="waves-effect waves-light btn @{{NewTheme.color}} @{{NewTheme.color}}-text">{{ $char }}</a>
				     	 	@else
								<a class="waves-effect waves-light btn @{{theme.color}} @{{theme.color}}-text">{{ $char }}</a>
				     	 	@endif
				    	</div>
					@endforeach
					@foreach (range('0', '9') as $number)
					    <div class="inline-block new-shortcut left">
							<input name="@{{key}}schortcut" type="radio" id="@{{key}}ctrl-{{ $number }}" ng-model="{{$model}}.shortcut" value="{{ $number }}" />
							<label for="@{{key}}ctrl-{{ $number }}" class="no-button"></label>
							@if($action === 'create')
								<a class="waves-effect waves-light btn @{{NewTheme.color}} @{{NewTheme.color}}-text">{{ $number }}</a>
							@else
								<a class="waves-effect waves-light btn @{{theme.color}} @{{theme.color}}-text">{{ $number }}</a>
				     	 	@endif
				    	</div>
					@endforeach
				</div>
			</div>
        </div>
        <div class="col s12 center">

        <input type="submit" class="waves-effect waves-light btn red inline-block" value="{{ $action }} theme">
        	{{-- <a class="waves-effect waves-light btn red inline-block" ng-click="createNewTheme()">Create theme</a>     --}}
        </div>
	</form>
</div>