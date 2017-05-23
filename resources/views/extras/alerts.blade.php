<div id="Alerts" class="Alerts" ng-controller="AlertController">
<!-- friends -->
	<!-- DeleteFriend dialogbox-->
	<div id="DeleteFriendAlert" class="alertbox" ng-click="Close()">
	  <!-- Modal content -->
	  <div class="modal-content" ng-click="$event.stopPropagation()">
	  	<!-- <h2 class="alert-title">Alert!</h2> -->
	  	<div class="alert-icon">
	  		<i class="bubble-icon alert red-text"></i>
	  	</div>
	    <span class="close" ng-click="Close()">&times;</span>
	    <p class="alert-header">Are you sure you want to remove this friend?</p>
	    <a class="btn waves-effect waves-light" ng-click="deleteFriendConfirmed()">I'm sure</a>
	    <a class="btn waves-effect waves-light red" ng-click="Close()">No!</a>
	  </div>
	</div>
	<!-- AddFriendToGroup dialogbox-->
	<div id="addFriendToGroupAlert" class="alertbox" ng-click="Close()">
	  <!-- Modal content -->
	  <div class="modal-content" ng-click="$event.stopPropagation()">
	  	<!-- <h2 class="alert-title">Alert!</h2> -->
	  	<div class="alert-icon">
	  		<i class="bubble-icon question red-text"></i>
	  	</div>
	    <span class="close" ng-click="Close()">&times;</span>
	    <p class="alert-header">Choose a group to which you want to add the friend</p>
	    <ul>
	    	<li ng-repeat="group in groupsWithoutFriend">
	    		<p>@{{group.chat_name}}</p>
				<a href="#!" class="secondary-content" ng-click="addFriendToGroupAlert(group.chat_id, 0, group.chat_name, group.friends)">
					<i class="material-icons">add</i>
			    </a>
	    	</li>
	    	<li ng-repeat="group in groupsNotConfirmed">
	    		<p>@{{group.chat_name}}</p>
				<a href="#!" class="secondary-content" ng-click="revokeInvite(group.friends, group.chat_id)">
					<i class="material-icons red">remove</i>
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
	  	<!-- <h2 class="alert-title">Alert!</h2> -->
	  	<div class="alert-icon">
	  		<i class="bubble-icon alert red-text"></i>
	  	</div>
	    <span class="close" ng-click="Close()">&times;</span>
        <p class="alert-header">Are you sure you want to leave this Group?</p>
	    <a class="btn waves-effect waves-light" ng-click="LeaveGroupConfirm()">I'm sure</a>
	    <a class="btn waves-effect waves-light red" ng-click="Close()">No!</a>
	  </div>
    </div>
    <!-- minimunAdmins required dialogbox-->
	<div id="minimunAdminsAlert" class="alertbox" ng-click="Close()">
	  <!-- Modal content -->
	  <div class="modal-content" ng-click="$event.stopPropagation()">
	  	<!-- <h2 class="alert-title">Alert!</h2> -->
	  	<div class="alert-icon">
	  		<i class="bubble-icon cross red-text"></i>
	  	</div>
	    <span class="close" ng-click="Close()">&times;</span>
        <p class="alert-header">There need to be at least 1 admin in a chat.</p>
	    <a class="btn waves-effect waves-light solo-btn" ng-click="Close()">I understand</a>
	  </div>
    </div>
    <!-- deleteGroup dialogbox-->
	<div id="deleteGroupAlert" class="alertbox" ng-click="Close()">
	  <!-- Modal content -->
	  <div class="modal-content" ng-click="$event.stopPropagation()">
	  	<!-- <h2 class="alert-title">Alert!</h2> -->
	  	<div class="alert-icon">
	  		<i class="bubble-icon alert red-text"></i>
	  	</div>
	    <span class="close" ng-click="Close()">&times;</span>
        <p class="alert-header">Are you sure you want to delete this group?</p>
	    <a class="btn waves-effect waves-light" ng-click="deleteGroupConfirm()">I'm sure</a>
	    <a class="btn waves-effect waves-light red" ng-click="Close()">No!</a>
	  </div>
    </div>
	<!-- deleteUserFromGroup dialogbox-->
	<div id="deleteUserFromGroupAlert" class="alertbox" ng-click="Close()">
	  <!-- Modal content -->
	  <div class="modal-content" ng-click="$event.stopPropagation()">
	  	<!-- <h2 class="alert-title">Alert!</h2> -->
	  	<div class="alert-icon">
	  		<i class="bubble-icon alert red-text"></i>
	  	</div>
	    <span class="close" ng-click="Close()">&times;</span>
        <p class="alert-header">Are you sure you want to delete this user?</p>
	    <a class="btn waves-effect waves-light" ng-click="deleteUserFromGroupConfirm()">I'm sure</a>
	    <a class="btn waves-effect waves-light red" ng-click="Close()">No!</a>
	  </div>
    </div>
	<!-- inviteFriendToGroup dialogbox-->
	<div id="inviteFriendToGroupAlert" class="alertbox" ng-click="Close()">
	  <!-- Modal content -->
	  <div class="modal-content" ng-click="$event.stopPropagation()">
	  	<!-- <h2 class="alert-title">Alert!</h2> -->
	  	<div class="alert-icon">
	  		<i class="bubble-icon question red-text"></i>
	  	</div>
	    <span class="close" ng-click="Close()">&times;</span>
	    <p class="alert-header">Choose a group to which you want to add the friend</p>
	    <ul>
	    	<li ng-repeat="friend in FriendsNotInGroup">
	    		<p>@{{friend.name}}</p>
				<a href="#!" class="secondary-content" ng-click="addFriendToGroupAlert(0, friend.userid, 0, 0, friend.name)">
					<i class="material-icons">add</i>
			    </a>
	    	</li>
	    </ul>
	    <ul>
	    	<li ng-repeat="friend in groupFriends" ng-if="!friend.confirmed">
	    		<p>@{{friend.name}}</p>
				<a href="#!" class="secondary-content" ng-click="revokeInvitefromGroup(friend.user_id)">
					<i class="material-icons red">remove</i>
			    </a>
	    	</li>
	    </ul>
	  </div>
	</div>
<!-- Theme alerts -->	
	<div id="deleteThemeAlert" class="alertbox" ng-click="Close()">
	  <!-- Modal content -->
	  <div class="modal-content" ng-click="$event.stopPropagation()">
	  	<!-- <h2 class="alert-title">Alert!</h2> -->
	  	<div class="alert-icon">
	  		<i class="bubble-icon alert red-text"></i>
	  	</div>
	    <span class="close" ng-click="Close()">&times;</span>
        <p class="alert-header">Are you sure you want to delete this theme?</p>
	    <a class="btn waves-effect waves-light" ng-click="deleteThemeConfirmed()">I'm sure</a>
	    <a class="btn waves-effect waves-light red" ng-click="Close()">No!</a>
	  </div>
	</div>
</div>