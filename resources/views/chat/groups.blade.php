<div id="groups" class="col s12 no-pad tab-item" ng-controller="GroupController">
	<!-- groups -->
	<div class="js-hide-groups js-scrolldown friends col s12">
		<ul ng-repeat="group in groups | filter:searchgroup" ng-if="group.function === 'groupschat'">
			<li data-id="@{{group.chatid}}" ng-click="openChat(group.chat_id , group.chat_name)"> @{{group.chat_name}} </li>
		</ul>
	</div>

	<!-- bottom controls -->
	<div class="js-bottom-group bottom col s12">
		<!-- buttons & input -->
		<nav class="js-search-friends search-friends">
			<div class="nav-wrapper">
			  <form>
			    <div class="input-field">
			      <input id="search" type="search" placeholder="search groups" ng-model="searchgroup" required>
			      <label class="label-icon" for="search"><i class="material-icons">search</i></label>
			      <i class="material-icons">close</i>
			    </div>
			  </form>
			</div>
		</nav>
		<a class="js-add-group btn waves-effect waves-light">Create Group</a>
		<div class="title-wrapper">
			<input type="text" placeholder="Chatname" ng-model="newGroup.chatname">
		</div>
		<!-- TODO filter laten werken ( endless scroll fixen ?) -->
		<nav class="search-new-friends">
			<div class="nav-wrapper">
			  <form>
			    <div class="input-field">
			      <input id="search" type="search" placeholder="add friends" required>
			      <label class="label-icon" for="search"><i class="material-icons">search</i></label>
			      <i class="material-icons">close</i>
			    </div>
			  </form>
			</div>
		</nav>
		
		<!-- search results: users added to the group -->
		<ul class="collection" ng-repeat="friend in newGroup.friends">
			<li class="collection-item red" data-id="@{{friend.id}}">@{{friend.name}}
			    <a href="#!" class="secondary-content" ng-click="toggleFriendToGroup(friend.chatid, newGroup.friends, friendsForGroup )">
					<i class="material-icons">remove</i>
			    </a> 
			</li>
		</ul>
		<!-- search results: users -->
		<ul class="collection" ng-repeat="friend in friendlist | filter:newFriendInput">
			<li class="collection-item" data-id="@{{friend.id}}">@{{friend.name}}
			    <a href="#!" class="secondary-content" ng-click="toggleFriendToGroup(friend.chatid, friendsForGroup, newGroup.friends)">
					<i class="material-icons">add</i>
			    </a> 
			</li>
		</ul>
		<a class="js-add-group btn waves-effect waves-light" ng-click="createGroup()">Create</a>
	</div>
</div>