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
			<li ng-repeat="(key, group) in groups | filter:searchgroup" ng-if="group.function === 'groupschat' && !group.is_deleted && group.confirmed" data-id="@{{group.chat_id}}" ng-click="openChat(group.chat_id , 0 , group.chat_name, 'groupschat', group.friends , group.userIsAdmin, key)"  ng-if="group.confirmed" class="first-letter-capital friend-item js-give-active button-close-nav">
				<p class="friend-name truncate">@{{group.chat_name}} </p>
				<span class="unread-messages v-align" ng-if="friend.unread_messages">@{{friend.unread_messages}}</span>
			</li>
		</ul>
	</div>

	<!-- bottom controls -->
	<div class="js-bottom-group bottom">
		<div class="white col s12">
			<!-- buttons & input -->
			<div class="js-search-friends search-friends">
				<div class="nav-wrapper">
				    <div class="input-field">
				      <input id="search-groups" type="search" placeholder="search groups" ng-model="searchgroup" autocomplete="off">
				      <label class="label-icon" for="search-groups"><i class="material-icons">search</i></label>
				      <i class="material-icons js-empty-input">close</i>
				    </div>
				</div>
			</div>
			<a class="js-add-friend btn waves-effect waves-light add-friend">Create group<i class="material-icons close-add-friend">clear</i></a>
			<form ng-submit="createGroup(newGroup.$valid)" id="createGroupForm" name="createGroupForm">
				<div class="title-wrapper">
					<input class="validate" autocomplete="off" id="createGroupsName" type="text" placeholder="Chatname" ng-model="newGroup.chatname" required>
				</div>
				<!-- TODO filter laten werken ( endless scroll fixen ?) -->
				
				<!-- search results: users added to the group -->
				<h2 ng-if="newGroup.friends.length > 0">Friends added to this group</h2>
				<ul class="collection js-newGroupFriends hide-scrollbar" ng-if="newGroup.friends.length > 0">
					<li class="collection-item teal-border newGroupFriends" data-id="@{{friend.id}}" ng-repeat="friend in newGroup.friends">
						<p class="name">@{{friend.name}}</p>
					    <a href="#!" class="secondary-content" ng-click="toggleFriendToGroup(friend.chatid, newGroup.friends, friendsForGroup )">
							<i class="material-icons">remove</i>
					    </a> 
					</li>
				</ul>
				<!-- search results: users -->
				<h2 ng-if="friendsForGroup.length > 0">Your friends</h2>
				<ul class="collection hide-scrollbar" ng-show="(friendsForGroup|filter:{name: groupFriendInput}).length > 0">
					<li class="collection-item" data-id="@{{friend.userid}}" ng-repeat="friend in friendsForGroup | filter:groupFriendInput"> 
						<p class="name">@{{friend.name}}</p>
					    <a href="#!" class="secondary-content" ng-click="toggleFriendToGroup(friend.chatid, friendsForGroup, newGroup.friends)">
							<i class="material-icons">add</i>
					    </a> 
					</li>
				</ul>
				<p ng-show="(friendsForGroup|filter:{name: groupFriendInput}).length === 0 && friendsForGroup.length !== 0">Not found.</p>
				<div class="createGroupBottom">
					<div class="search-new-groups" ng-show="friendsForGroup.length > 0">
						<div class="nav-wrapper">
						    <div class="input-field">
						      <input id="search-groupfriends" type="search" placeholder="search friends" autocomplete="off" ng-model="groupFriendInput">

						      <label class="label-icon" for="search-groupfriends"><i class="material-icons">search</i></label>
						      <i class="material-icons close-search js-empty-input">close</i>
						    </div>
						</div>
					</div>
					<button type="submit" class="js-add-group js-creategroup col s12 submit-group-form btn waves-effect waves-light close-add-friend">Create</button>
				</div>
			</form>
		</div>
	</div>
</div>