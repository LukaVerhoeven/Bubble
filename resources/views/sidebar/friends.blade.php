<div id="friends" class="col s12 no-pad tab-item" ng-controller="FriendController">
	<!-- friends -->
	<div class="js-scrolldown friends hide-scrollbar">
		<h2 class="side-header card">Friends</h2>
		<ul class="request no-margin-top ">
			<li ng-repeat="request in friendRequests" class="row" data-id="@{{request.id}}"> 
				<div class="request-head white-text red darken-4 col s12">
					<i class="bubble-icon friend"></i>
					<p class="inline-block v-align">Friend request</p>
				</div>
				<p class="inline-block col s12 groupname first-letter-capital">@{{request.name}}  </p> 
				<div class="col s12 buttons">
					<a class="btn waves-effect waves-light red ns" ng-click="decline(request.user_id)">Decline</a> 
					<a class="btn waves-effect waves-light ns" ng-click="addFriend(request.user_id, true)">Accept</a>
				</div>
			</li>
		</ul>
		<ul class="js-active-container no-margin-top">
			<li ng-repeat="(key, friend) in friendlist | filter:searchfriend" data-id="@{{friend.userid}}" ng-click="openChat(friend.chatid , friend.userid , friend.name , 'friendchat', null, 1, key)" class="first-letter-capital friend-item js-give-active">
				<p class="friend-name">@{{friend.name}}</p> 
				<span class="unread-messages" ng-if="friend.unread_messages">@{{friend.unread_messages}}</span>
				<span class="online-state offline v-align" ng-if="!friend.isOnline"></span><span class="online-state online v-align" ng-if="friend.isOnline"></span>
			</li>
		</ul>
	</div>

	<!-- bottom controls -->
	<div class="js-bottom-add bottom">
		<div class="white col s12">
			<!-- buttons & input -->
			<nav class="js-search-friends search-friends">
				<div class="nav-wrapper">
				  <form>
				    <div class="input-field">
				      <input id="search-friends" type="search" placeholder="search friends" ng-model="searchfriend" required>
				      <label class="label-icon" for="search-friends"><i class="material-icons">search</i></label>
				      <i class="material-icons">close</i>
				    </div>
				  </form>
				</div>
			</nav>
			<a class="js-add-friend btn waves-effect waves-light add-friend">Add friend <i class="material-icons close-add-friend">clear</i></a>
			<nav class="search-new-friends js-search-new-friends">
				<div class="nav-wrapper">
				  <form>
				    <div class="input-field">
				      <input id="search-add-friend" type="search" ng-model="newFriendInput" ng-keyup="updateFriendSearch(newFriendInput)" placeholder="add friends" autocomplete="off" required>
				      <label class="label-icon" for="search-add-friend"><i class="material-icons">search</i></label>
				      <i class="material-icons close-search">close</i>
				    </div>
				  </form>
				</div>
			</nav>

			<!-- search results: users -->
			<ul class="collection" ng-if="searchedfriends.length > 0">
				<li class="collection-item" data-id="@{{friend.id}}" ng-repeat="(key, friend) in searchedfriends">
				<p class="name">@{{friend.name}}</p>
				    <a href="#!" class="secondary-content js-send-friendrequest" ng-click="addFriend(friend.id,false,key)">
							<i class="material-icons">add</i>
				    </a> 
				</li>
			</ul>
		</div>
	</div>
</div>