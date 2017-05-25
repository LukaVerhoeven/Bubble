<div id="groups" class="col s12 no-pad tab-item" ng-controller="GroupController">
	<!-- groups -->
	<div class="js-scrolldown friends hide-scrollbar no-margin-top">
		<ul class="no-margin-top request">
			<h2 class="side-header card">Groupchats</h2>
			<li ng-repeat="group in groups" ng-if="group.function === 'groupschat' && !is_deleted && !group.confirmed" class="row" data-id="@{{group.chat_id}}">
				<div class="request-head white-text red darken-4 col s12">
					<i class="bubble-icon group v-align"></i>
					<p class="inline-block v-align">Group request</p>
				</div>
				<p class="inline-block col s12 groupname first-letter-capital truncate">@{{group.chat_name}} </p> 
				<div class="col s12 buttons">
					<a class="btn waves-effect waves-light red ns" ng-click="decline(group.chat_id, group.friends)">Decline</a> 
					<a class="btn waves-effect waves-light ns" ng-click="accept(group.chat_id, group.friends)">Accept</a>
				</div>
			</li>
		</ul>
		<ul class="js-active-container hide-scrollbar no-margin-top">
			<li ng-repeat="(key, group) in groups | filter:searchgroup" ng-if="group.function === 'groupschat' && !is_deleted" data-id="@{{group.chat_id}}" ng-click="openChat(group.chat_id , 0 , group.chat_name, 'groupschat', group.friends , group.userIsAdmin, key)"  ng-if="group.confirmed" class="first-letter-capital friend-item js-give-active">
				<p class="friend-name truncate">@{{group.chat_name}} </p>
				<span class="unread-messages v-align" ng-if="friend.unread_messages">@{{friend.unread_messages}}</span>
			</li>
		</ul>
	</div>

	<!-- bottom controls -->
	<div class="js-bottom-group bottom">
		<div class="white col s12">
			<!-- buttons & input -->
			<nav class="js-search-friends search-friends">
				<div class="nav-wrapper">
				  <form>
				    <div class="input-field">
				      <input id="search-groups" type="search" placeholder="search groups" ng-model="searchgroup" autocomplete="off" required>
				      <label class="label-icon" for="search-groups"><i class="material-icons">search</i></label>
				      <i class="material-icons js-empty-input">close</i>
				    </div>
				  </form>
				</div>
			</nav>
			<a class="js-add-friend btn waves-effect waves-light add-friend">Create group<i class="material-icons close-add-friend">clear</i></a>
			<div class="title-wrapper">
				<input id="createGroupsName" type="text" placeholder="Chatname" ng-model="newGroup.chatname">
			</div>
			<!-- TODO filter laten werken ( endless scroll fixen ?) -->
			
			<!-- search results: users added to the group -->
			<ul class="collection" ng-if="newGroup.friends.length > 0">
				<li class="collection-item red" data-id="@{{friend.id}}" ng-repeat="friend in newGroup.friends">
					<p class="name">@{{friend.name}}</p>
				    <a href="#!" class="secondary-content" ng-click="toggleFriendToGroup(friend.chatid, newGroup.friends, friendsForGroup )">
						<i class="material-icons">remove</i>
				    </a> 
				</li>
			</ul>
			<!-- search results: users -->
			<ul class="collection" ng-if="friendlist.length > 0">
				<li class="collection-item" data-id="@{{friend.id}}" ng-repeat="friend in friendlist | filter:newFriendInput"> 
					<p class="name">@{{friend.name}}</p>
				    <a href="#!" class="secondary-content" ng-click="toggleFriendToGroup(friend.chatid, friendsForGroup, newGroup.friends)">
						<i class="material-icons">add</i>
				    </a> 
				</li>
			</ul>
			<nav class="search-new-groups">
				<div class="nav-wrapper">
				  <form>
				    <div class="input-field">
				      <input id="search-groupfriends" type="search" placeholder="add friends" autocomplete="off" ng-model="newFriendInput" required>
				      <label class="label-icon" for="search-groupfriends"><i class="material-icons">search</i></label>
				      <i class="material-icons close-search js-empty-input">close</i>
				    </div>
				  </form>
				</div>
			</nav>
			<a class="js-add-group btn waves-effect waves-light close-add-friend" ng-click="createGroup()">Create</a>
		</div>
	</div>
</div>