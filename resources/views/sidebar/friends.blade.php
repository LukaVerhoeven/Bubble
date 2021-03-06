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
				<p class="inline-block col s12 groupname first-letter-capital truncate">@{{request.name}}  </p> 
				<div class="col s12 buttons">
					<a class="btn waves-effect waves-light red ns" ng-click="decline(request.user_id)">Decline</a> 
					<a class="btn waves-effect waves-light ns" ng-click="addFriend(request.user_id, true)">Accept</a>
				</div>
			</li>
		</ul>
		<ul class="js-active-container no-margin-top">
				<li ng-repeat="(key, friend) in friendlist | filter:searchfriend" data-id="@{{friend.userid}}" ng-click="openChat(friend.chatid , friend.userid , friend.nickname , 'friendchat', null, 1, key)" class="first-letter-capital friend-item js-give-active button-close-nav">
						<p class="friend-name truncate">@{{friend.nickname}}</p> 
						<span class="unread-messages v-align" ng-if="friend.unread_messages">@{{friend.unread_messages}}</span>
						<span class="online-state offline v-align" ng-if="!friend.isOnline"></span><span class="online-state online v-align" ng-if="friend.isOnline"></span>
				</li>
		</ul>
	</div>

	<!-- bottom controls -->
	<div class="js-bottom-add bottom">
		<div class="white col s12">
			<!-- buttons & input -->
			<div class="bottom-container">
				<div class="js-search-friends search-friends">
					<div class="nav-wrapper">
					  <form>
					    <div class="input-field">
					      <input id="search-friends" type="search" placeholder="search friends" ng-model="searchfriend" required>
					      <label class="label-icon" for="search-friends"><i class="material-icons">search</i></label>
					      <i class="material-icons js-empty-input">close</i>
					    </div>
					  </form>
					</div>
				</div>
				<a class="js-add-friend btn waves-effect waves-light add-friend">Add friend <i class="material-icons close-add-friend" ng-click="emptySearch()">clear</i></a>
			</div>
			<div class="search-new-friends js-search-new-friends">
				<div class="nav-wrapper">
				    <div class="input-field no-margin-top">
				      <input id="search-add-friend" type="search" ng-model="newFriendInput" ng-keyup="updateFriendSearch(newFriendInput)" placeholder="add friends" autocomplete="off" required>
				      <label class="label-icon" for="search-add-friend"><i class="material-icons">search</i></label>
				      <i class="material-icons close-search js-empty-input" ng-click="updateFriendSearch('')">close</i>
				    </div>
				</div>
			</div>

			<!-- search results: users -->
			<ul class="collection" ng-if="searchedfriends.length > 0">
				<li class="collection-item" data-id="@{{friend.id}}" ng-repeat="(key, friend) in searchedfriends">
				<p class="name first-letter-capital">@{{friend.name}}</p>
				    <a href="#!" class="secondary-content js-send-friendrequest" ng-click="addFriend(friend.id,false,key)">
							<i class="material-icons">add</i>
				    </a> 
				</li>
			</ul>
			<p  ng-show="searchedfriends.length < 1 && newFriendInput && searchFriendLoaded" >No one found.</p>
		</div>
	</div>
</div>