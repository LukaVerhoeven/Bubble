<!DOCTYPE html>
<html lang="{{ config('app.locale') }}" class="grey lighten-4" ng-app='bubble'>
	<head>
		<link rel="icon" href="{{URL::asset('/img/bubble-icon.png')}}">
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="csrf-token" content="{{ csrf_token() }}">
		<title>Bubble</title>
		<link href="/css/all.css" rel="stylesheet" type="text/css">
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

	</head>
	<body id="bubble" ng-controller="GlobalController">
		<div ng-view>
			<!-- Sidebar -->
			<div class="side-nav fixed " id="sidebar" >
				<div class="no-pad sidebar">

					<header class="row red darken-1">
						<!-- profile info -->
						<div class="valign-wrapper profile-info">
							<div class="col s4 no-pad  img-overflow circle center fixed">
								<img class="profile-pic " src="{{ Auth::user()->profile_image }}" alt="">
							</div>
							<div class="col s8 fixed"si>
								<h1 class="bubble-username">{{ Auth::user()->name }}</h1>
								<h2 class="bubble-email">{{ Auth::user()->email }}</h2>
							</div>
						</div>
						<!-- sidebar menu-items -->
						<nav>
							<div class="nav-content">
								<form id="logout" action="/logout" method="POST">
								{{ csrf_field() }}
								<ul class="tabs tabs-transparent valign-wrapper red darken-1">
									<li class="tab" onclick=""><a  href="#" onclick="document.getElementById('logout').submit()"><i class="small material-icons col s2 ">input</i></a></li>
									<li class="tab "><a href="#profilesettings"><i class="small material-icons col s2">settings</i></a></li>
									<li class="tab "><a href="#profile"><i class="small material-icons col s2 ">perm_identity</i></a></li>
									<li class="tab "><a class="active" href="#friends"><i class="bubble-icon friend"></i></a></li>
									<li class="tab "><a href="#groups"><i class="bubble-icon group"></i></a></li>
								</ul>
								</form>
								
							</div>
						</nav>
					</header>

					<!-- sidebar content -->
					<section class="side-nav-content row">
						<div id="profilesettings" class="col s12 no-pad tab-item">settings </div>
						@include('sidebar.profile')
						@include('sidebar.friends')
						@include('sidebar.groups')
					</section>

				</div>
			</div>

			<!-- Main content -->
			<div class="fixed-container">
				<div class="row " id="content">
					<div class="col s12 no-pad content-div">

						<!-- navigation content -->
						<nav class="nav-extended" ng-controller="NavController">
							<div class="nav-content red darken-1">
								<ul class="tabs tabs-transparent valign-wrapper">
									<li class="tab col s4 conversation-tab"><a class="active" href="#chat-section"><i class="small material-icons  col s2 offset-s3">chatbubble</i><span class="col s2" > @{{ chatname }} </span></a></li>
									<li class="tab col s4 theme-tab"><a href="#themes"><i class="small material-icons  col s2 offset-s3">loyalty</i><span class="col s2">Theme</span></a></li>
									<li class="tab col s4 settings-tab"><a href="#chat-settings"><i class="small material-icons  col s2 offset-s3">settings</i><span class="col s2">settings</span></a></li>
								</ul>
							</div>
						</nav>

						<!-- content -->
						<section class="content-body">

							<!-- tab1 conversation-->
							@include('content.conversation')

							<!-- tab2 themes -->
							@include('content.themes')

							<!-- tab3 setting -->
							@include('content.chat-settings')
						</section>

					</div>
						
				</div>
			</div>
		</div>
		@include('extras.alerts')
		@include('components.fullscreen-preloader')
		<script>
			window.Laravel = { 'csrfToken' : '{{ csrf_token() }}' };
		</script>
		
		{{-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script> --}}
		{{-- <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.min.js"></script> --}}
		{{-- <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-sanitize/1.6.4/angular-sanitize.js"></script> --}}

		<script src="//js.pusher.com/4.0/pusher.min.js"></script>
		<script src="/js/all.js"></script>
		<script src="/js/materialize.js"></script>
		{{-- <script src="//cdnjs.cloudflare.com/ajax/libs/ngInfiniteScroll/1.3.0/ng-infinite-scroll.js"></script> --}}
		{{-- <script src="/js/angular.js"></script> --}}
		{{-- <script src="{{ asset('js/angular/app.js') }}"></script> --}}
    {{-- 	<script src="{{ asset('js/angular/controllers/MessageController.js') }}"></script>
    	<script src="{{ asset('js/angular/controllers/FriendController.js') }}"></script>
    	<script src="{{ asset('js/angular/controllers/NavController.js') }}"></script>
    	<script src="{{ asset('js/angular/controllers/GlobalController.js') }}"></script>
    	<script src="{{ asset('js/angular/controllers/GroupController.js') }}"></script> --}}
    	<!-- browser sync -->
    	<script id="__bs_script__">//<![CDATA[
    document.write("<script async src='http://HOST:3000/browser-sync/browser-sync-client.js?v=2.18.11'><\/script>".replace("HOST", location.hostname));
//]]></script>

	</body>
</html>