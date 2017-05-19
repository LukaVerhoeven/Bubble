<div id="friends" class="col s12 no-pad tab-item" ng-controller="FriendController">
	<!-- friends -->
	<div class="js-hide-friends js-scrolldown friends">
		<ul class="request no-margin-top ">
			<li ng-repeat="request in friendRequests" class="row" data-id="@{{request.id}}"> 
				<div class="request-head white-text red darken-4 col s12">
					<i class="bubble-icon friend"></i>
					<p class="inline-block v-align">Friend request</p>
				</div>
				<p class="inline-block col s12 groupname">@{{request.name}}  </p> 
				<div class="col s12 buttons">
					<a class="btn waves-effect waves-light red ns" ng-click="decline(request.user_id)">Decline</a> 
					<a class="btn waves-effect waves-light ns" ng-click="addFriend(request.user_id, true)">Accept</a>
				</div>
			</li>
		</ul>
		<ul ng-repeat="(key, friend) in friendlist | filter:searchfriend">
			<li data-id="@{{friend.userid}}" ng-click="openChat(friend.chatid , friend.userid , friend.name , 'friendchat', null, 1, key)"> @{{friend.name}} 
			<span class="unread-messages" ng-if="friend.unread_messages">@{{friend.unread_messages}}</span>
			<span class="online-state offline" ng-if="!friend.isOnline"></span><span class="online-state online" ng-if="friend.isOnline"></span></li>
		</ul>
	</div>

	<!-- bottom controls -->
	<div class="js-bottom-add bottom col s12">
		<!-- buttons & input -->
		<nav class="js-search-friends search-friends">
			<div class="nav-wrapper">
			  <form>
			    <div class="input-field">
			      <input id="search" type="search" placeholder="search friends" ng-model="searchfriend" required>
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
			      <input id="search" type="search" ng-model="newFriendInput" ng-keyup="updateFriendSearch(newFriendInput)" placeholder="add friends" autocomplete="off" required>
			      <label class="label-icon" for="search"><i class="material-icons">search</i></label>
			      <i class="material-icons">close</i>
			    </div>
			  </form>
			</div>
		</nav>

		<!-- search results: users -->
		<ul class="collection"  ng-repeat="friend in searchedfriends">
			<li class="collection-item" data-id="@{{friend.id}} ">@{{friend.name}} 
			    <a href="#!" class="secondary-content" ng-click="addFriend(friend.id,false)">
						<i class="material-icons">add</i>
			    </a> 
			</li>
		</ul>
	</div>
</div>