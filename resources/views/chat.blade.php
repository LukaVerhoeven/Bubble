<!DOCTYPE html>
<html lang="{{ config('app.locale') }}" class="grey lighten-4" ng-app='bubble'>
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="csrf-token" content="{{ csrf_token() }}">
		<title>Bubble</title>
		<link href="/css/all.css" rel="stylesheet" type="text/css">
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	</head>
	<body>
		<div class="side-nav fixed " id="sidebar">
			<div class="no-pad sidebar">

				<header class="row red darken-1">
					<div class="valign-wrapper profile-info">
						<div class="col s4 no-pad  img-overflow circle center fixed">
							<img class="profile-pic " src="/img/pirate.jpg" alt="">
						</div>
						<div class="col s8 fixed"si>
							<h1 class="bubble-username">{{ Auth::user()->name }}</h1>
							<h2 class="bubble-email">{{ Auth::user()->email }}</h2>
						</div>
					</div>
					<nav>
						<div class="nav-content">
							<form id="logout" action="/logout" method="POST">
							{{ csrf_field() }}
							<ul class="tabs tabs-transparent valign-wrapper materialize-red lighten-2">
								<li class="tab" onclick=""><a  href="#" onclick="document.getElementById('logout').submit()"><i class="small material-icons col s2 ">input</i></a></li>
								<li class="tab "><a href="#profilesettings"><i class="small material-icons col s2">settings</i></a></li>
								<li class="tab "><a href="#profile"><i class="small material-icons col s2 ">perm_identity</i></a></li>
								<li class="tab "><a class="active" href="#friends"><i class="small material-icons col s2 ">chatbubble</i></a></li>
								<li class="tab "><a href="#groups"><i class="small material-icons col s2">chatbubble</i></a></li>
							</ul>
							</form>
							
						</div>
					</nav>
				</header>

				<section class="side-nav-content row">
					<div id="profilesettings" class="col s12 no-pad tab-item">settings </div>
					<div id="profile" class="col s12 no-pad tab-item">profile </div>
					<div id="friends" class="col s12 no-pad tab-item" ng-controller="FriendController">
						<div class="js-hide-friends js-scrolldown friends col s12">
							<ul ng-repeat="item in friendlist">
								<div ng-if="item.friendchat.function === 'friendchat'">
									<li data-id="@{{item.friendchat.usersinchat[0].user.id}}" ng-click="openChat(item.friendchat.id , item.friendchat.usersinchat[0].user.name)"> @{{item.friendchat.usersinchat[0].user.name}} </li>
								</div>
							</ul>
						</div>
						<div class="js-bottom-add bottom col s12">
							<nav class="js-search-friends search-friends">
								<div class="nav-wrapper">
								  <form>
								    <div class="input-field">
								      <input id="search" type="search" required>
								      <label class="label-icon" for="search"><i class="material-icons">search</i></label>
								      <i class="material-icons">close</i>
								    </div>
								  </form>
								</div>
							</nav>
							<a class="js-add-friend btn waves-effect waves-light">add friend</a>
							<nav class="search-new-friends">
								<div class="nav-wrapper">
								  <form>
								    <div class="input-field">
								      <input id="search" type="search" ng-model="newFriendInput" ng-keypress="updateFriendSearch()" required>
								      <label class="label-icon" for="search"><i class="material-icons">search</i></label>
								      <i class="material-icons">close</i>
								    </div>
								  </form>
								</div>
							</nav>
							<ul class="collection"  ng-repeat="friend in searchedfriends | filter: newFriendInput">
								<li class="collection-item" data-id="@{{friend.id}} ">@{{friend.name}} 
								    <a href="#!" class="secondary-content" ng-click="addFriend(friend.id)">
											<i class="material-icons">add</i>
								    </a> 
								</li>
							</ul>
						</div>
					</div>
					<div id="groups" class="col s12 tab-item">group chat </div>
				</section>

			</div>
		</div>
		<div class="fixed-container">
			<div class="row " id="content">
				<div class="col s12 no-pad content-div">

					<!-- navigation content -->
					<nav class="nav-extended" ng-controller="NavController">
						<div class="nav-content red darken-1">
							<ul class="tabs tabs-transparent valign-wrapper">
								<li class="tab col s4 conversation-tab"><a class="active" href="#chat-section"><i class="small material-icons  col s2 offset-s3">chatbubble</i><span class="col s2" > @{{ chatname }} </span></a></li>
								<li class="tab col s4 theme-tab"><a href="#test2"><i class="small material-icons  col s2 offset-s3">loyalty</i><span class="col s2">Theme</span></a></li>
								<li class="tab col s4 settings-tab"><a href="#test3"><i class="small material-icons  col s2 offset-s3">settings</i><span class="col s2">settings</span></a></li>
							</ul>
						</div>
					</nav>

					<!-- content -->
					<section class="content-body">

						<!-- tab1 conversation-->
						<div id="chat-section" class="col s12 tab-item" ng-controller="MessageController">

							<!-- messages -->
							<div class="chat-box">
								<div class="chat">
									<div ng-repeat="message in messages" class="message section card">
										@{{ message.text }}
									</div>
								</div>
							</div>

							<!-- chat input -->
							<div class="chat-input">
								<nav >
							    <div class="nav-wrapper white">
							      <form name="frmMessage" novalidate="">
							        <div class="input-field">
							          <input type="search" id="message-text" ng-model="message.text" ng-keypress="sendMessage($event)">
							          <label class="label-icon" for="search"><i class="material-icons">note_add</i></label>
							          <i class="material-icons send">send</i>
							        </div>

							      </form>
							    </div>
							  </nav>
							</div>
							 
							 <!-- filter -->
							 <div class="filter">
								<div class="side-nav z-depth-1">
									<ul>
										<li><a href=""></a></li>
										<li><a href=""></a></li>
										<li><a href=""></a></li>
										<li><a href=""></a></li>
										<li><a href=""></a></li>
									</ul>
								</div>
							 </div>

						</div>

						<!-- tab2 themes -->
						<div id="test2" class="col s12 tab-item">Test 2 </div>

						<!-- tab3 setting -->
						<div id="test3" class="col s12 tab-item">Test 4 </div>
					</section>

				</div>
					
			</div>
		</div>
		<script>
			window.Laravel = { 'csrfToken' : '{{ csrf_token() }}' };
		</script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.min.js"></script>
		<script src="https://js.pusher.com/4.0/pusher.min.js"></script>
		<script src="/js/materialize.js"></script>
		<script src="/js/all.js"></script>
		<script src="{{ asset('js/angular/app.js') }}"></script>
    	<script src="{{ asset('js/angular/controllers/MessageController.js') }}"></script>
    	<script src="{{ asset('js/angular/controllers/FriendController.js') }}"></script>
    	<script src="{{ asset('js/angular/controllers/NavController.js') }}"></script>
	</body>
</html>