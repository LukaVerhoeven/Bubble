<div id="friends" class="col s12 no-pad tab-item" ng-controller="FriendController">
	<!-- friends -->
	<div class="js-hide-friends js-scrolldown friends col s12">
		<ul ng-repeat="friend in friendlist | filter:searchfriend">
			<li data-id="@{{friend.userid}}" ng-click="openChat(friend.chatid , friend.name)"> @{{friend.name}} </li>
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
			      <input id="search" type="search" ng-model="newFriendInput" ng-keyup="updateFriendSearch(newFriendInput)" placeholder="add friends" required>
			      <label class="label-icon" for="search"><i class="material-icons">search</i></label>
			      <i class="material-icons">close</i>
			    </div>
			  </form>
			</div>
		</nav>

		<!-- search results: users -->
		<ul class="collection"  ng-repeat="friend in searchedfriends">
			<li class="collection-item" data-id="@{{friend.id}} ">@{{friend.name}} 
			    <a href="#!" class="secondary-content" ng-click="addFriend(friend.id)">
						<i class="material-icons">add</i>
			    </a> 
			</li>
		</ul>
	</div>
</div>