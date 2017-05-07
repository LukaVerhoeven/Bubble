<div id="Alerts" class="Alerts" ng-controller="AlertController">
<!-- friends -->
	<!-- DeleteFriend dialogbox-->
	<div id="DeleteFriendAlert" class="alertbox" ng-click="Close()">
	  <!-- Modal content -->
	  <div class="modal-content" ng-click="$event.stopPropagation()">
	    <span class="close">&times;</span>
	    <p>Are you sure you want to remove this friend?</p>
	    <a class="btn waves-effect waves-light" ng-click="deleteFriendConfirmed()">I'm sure</a>
	    <a class="btn waves-effect waves-light red" ng-click="Close()">No!</a>
	  </div>
	</div>
	<!-- AddFriendToGroup dialogbox-->
	<div id="addFriendToGroupAlert" class="alertbox" ng-click="Close()">
	  <!-- Modal content -->
	  <div class="modal-content" ng-click="$event.stopPropagation()">
	    <span class="close">&times;</span>
	    <p>Choose a group to which you want to add the friend</p>
	    <ul>
	    	<li ng-repeat="group in groupsWithoutFriend">@{{group.chat_name}}
				<a href="#!" class="secondary-content" ng-click="addFriendToGroupAlert(group.chat_id, 0, group.chat_name, group.friends)">
					<i class="material-icons">add</i>
			    </a>
	    	</li>
	    </ul>
	  </div>
	</div>
<!-- groupschat -->
	<!-- LeaveGroupschat dialogbox-->
	<div id="LeaveGroupschatAlert" class="alertbox" ng-click="Close()">
	  <!-- Modal content -->
	  <div class="modal-content" ng-click="$event.stopPropagation()">
	    <span class="close">&times;</span>
        <p>Are you sure you want to leave this Group?</p>
	    <a class="btn waves-effect waves-light" ng-click="LeaveGroupConfirm()">I'm sure</a>
	    <a class="btn waves-effect waves-light red" ng-click="Close()">No!</a>
	  </div>
    </div>
    <!-- minimunAdmins required dialogbox-->
	<div id="minimunAdminsAlert" class="alertbox" ng-click="Close()">
	  <!-- Modal content -->
	  <div class="modal-content" ng-click="$event.stopPropagation()">
	    <span class="close">&times;</span>
        <p>There need to be at least 1 admin in a chat.</p>
	    <a class="btn waves-effect waves-light" ng-click="Close()">I understand</a>
	  </div>
    </div>
    <!-- deleteGroup dialogbox-->
	<div id="deleteGroupAlert" class="alertbox" ng-click="Close()">
	  <!-- Modal content -->
	  <div class="modal-content" ng-click="$event.stopPropagation()">
	    <span class="close">&times;</span>
        <p>Are you sure you want to delete this group?</p>
	    <a class="btn waves-effect waves-light" ng-click="deleteGroupConfirm()">I'm sure</a>
	    <a class="btn waves-effect waves-light red" ng-click="Close()">No!</a>
	  </div>
    </div>
	<!-- deleteUserFromGroup dialogbox-->
	<div id="deleteUserFromGroupAlert" class="alertbox" ng-click="Close()">
	  <!-- Modal content -->
	  <div class="modal-content" ng-click="$event.stopPropagation()">
	    <span class="close">&times;</span>
        <p>Are you sure you want to delete this user?</p>
	    <a class="btn waves-effect waves-light" ng-click="deleteUserFromGroupConfirm()">I'm sure</a>
	    <a class="btn waves-effect waves-light red" ng-click="Close()">No!</a>
	  </div>
    </div>
	<!-- inviteFriendToGroup dialogbox-->
	<div id="inviteFriendToGroupAlert" class="alertbox" ng-click="Close()">
	  <!-- Modal content -->
	  <div class="modal-content" ng-click="$event.stopPropagation()">
	    <span class="close">&times;</span>
	    <p>Choose a group to which you want to add the friend</p>
	    <ul>
	    	<li ng-repeat="friend in FriendsNotInGroup">@{{friend.name}}
				<a href="#!" class="secondary-content" ng-click="addFriendToGroupAlert(0, friend.userid, 0, 0, friend.name)">
					<i class="material-icons">add</i>
			    </a>
	    	</li>
	    </ul>
	    <ul>
	    	<li ng-repeat="friend in groupFriends" ng-if="!friend.confirmed">@{{friend.name}}
				<a href="#!" class="secondary-content" ng-click="">
					<i class="material-icons red-text">remove</i>
			    </a>
	    	</li>
	    </ul>
	  </div>
	</div>
</div>