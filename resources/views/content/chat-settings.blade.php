<div id="chat-settings" class="col s12 tab-item bottom-gutter-double" ng-controller="ChatSettingsController">
	<div class="top-gutter-double-extra margin-div col s12">
		<div class="settings-layout card">
		<!-- Main options -->
        	<div class="card-content col s12 ">
		        <p>Nickname</p>
		        <div class="right">
		          	<p>@{{ chatname }}</p>
		          	<a class="btn-floating btn red">
			     	 	<i class="material-icons">mode_edit</i>
			    	</a>
	          	</div>
	        </div>
	        <div class="card-content col s12" ng-if="chatFunction === 'friendchat'">
    	   		<p>invite to group</p><a ng-click="addFriendToGroup()" class="waves-effect waves-light btn right">add to group +</a>
	        </div>
	        <div class="card-content col s12" ng-if="chatFunction === 'groupschat'">
    	   		<p>Add friend to group</p><a ng-click="inviteFriendToGroup()" class="waves-effect waves-light btn right">invite friend +</a>
	        </div>
	        <div class="card-content col s12" ng-if="chatFunction === 'friendchat'">
	        	<p>Delete friend</p><a ng-click="deleteFriend()" class="waves-effect waves-light btn red right">delete</a>
	        </div>
	        <div class="card-content col s12" ng-if="chatFunction === 'groupschat' && isChatAdmin">
	        	<p>Delete group</p><a class="waves-effect waves-light btn red right">delete</a>
	        </div>
	        <div class="card-content col s12" ng-if="chatFunction === 'groupschat'">
	        	<p>Leave group</p><a ng-click="LeaveGroup()" class="waves-effect waves-light btn red right">Leave</a>
	        </div>
        <!-- Theme-option -->
	        <div class="card-content col s12">
	        	<p>Themes</p>
	        	<div class="right">
	        		<p>Usage</p>
	        		<p ng-if="isChatAdmin">Active</p>
	        		<p ng-if="isChatAdmin">Delete</p>
	        	</div>
	        </div>
	    <!-- Group admin options -->
	    	<!-- head -->
	    	<div ng-if="chatFunction === 'groupschat'">
		        <div class="card-content col s12">
		        	<p>Members</p>
		        	<div class="right" ng-if="isChatAdmin">
		        		<p>Admin</p>
		        		<p>Delete</p>	
		        	</div>
		        </div>
		        <!-- tables -->
		        <div class="card-content col s12" ng-repeat="(key, friend) in groupFriends" ng-if="friend.confirmed">
		        	<p>@{{ friend.name }}</p>
		        	<div class="right" ng-if="isChatAdmin">
	        		    <p>
					      <input type="checkbox" class="filled-in" id="filled-in-box@{{key}}" checked="checked" ng-if="friend.admin"/>
					      <input type="checkbox" class="filled-in" id="filled-in-box@{{key}}" ng-if="!friend.admin"/>
					      <label for="filled-in-box@{{key}}"></label>
					    </p>
					      <p>
					      <a><i class="small material-icons col s2 red-text">delete</i></a>
					    </p>
		        	</div>
		        </div>
	        </div>
		</div>
	</div>
</div>