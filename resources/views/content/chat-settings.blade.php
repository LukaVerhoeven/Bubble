<div id="chat-settings" class="col s12 tab-item bottom-gutter-double" ng-controller="ChatSettingsController">
	<div class="top-gutter-double margin-div col s12">
		<div class="settings-layout card">
		<!-- Main options -->
        	<div class="card-content col s12 js-parent">
		        <p ng-if="chatFunction === 'friendchat'" class="text-block-center">Nickname</p>
		        <p ng-if="chatFunction === 'groupschat'" class="text-block-center">Groupsname</p>
		        <div class="right solid-block bubble-editName" id="editChatName">
		          	<p class="text-block-center">@{{ chatname }}</p>
		          	<a class="btn-floating btn red bubble-editButton v-align">
			     	 	<i class="material-icons ">mode_edit</i>
			    	</a>
	          	</div>
	          	<div class="right solid-block bubble-editInput" id="editChatNameInput">
		          	<input type="text" placeholder="@{{chatname}}" ng-model="newChatName" maxlength="20">
		          	<div class="buttons">
			          	<a class=" btn-floating btn bubble-editButton" ng-click="editchatname(newChatName)">
				     	 	<i class="material-icons">done</i>
				    	</a>
			          	<a class=" btn-floating btn bubble-editButton grey clear">
				     	 	<i class="material-icons">clear</i>
				    	</a>
		          	</div>
	          	</div>
	        </div>
	        <div class="card-content col s12 solid-block" ng-if="chatFunction === 'friendchat'">
    	   		<p class="text-block-center">Invite to group</p><a ng-click="addFriendToGroup()" class=" v-align waves-effect waves-light btn right settings-btn">add to group +</a>
	        </div>
	        <div class="card-content col s12 solid-block" ng-if="chatFunction === 'groupschat'">
    	   		<p class="text-block-center">Add friend to group</p><a ng-click="inviteFriendToGroup()" class=" v-align waves-effect waves-light btn right settings-btn">invite friend +</a>
	        </div>
	        <div class="card-content col s12 solid-block" ng-if="chatFunction === 'friendchat'">
	        	<p class="text-block-center">Delete friend</p><a ng-click="deleteFriend()" class=" v-align waves-effect waves-light btn red right settings-btn">delete</a>
	        </div>
	        <div class="card-content col s12 solid-block" ng-if="chatFunction === 'groupschat' && isChatAdmin">
	        	<p class="text-block-center">Delete group</p><a ng-click="deleteGroup()" class=" v-align waves-effect waves-light btn red right settings-btn">delete</a>
	        </div>
	        <div class="card-content col s12 solid-block" ng-if="chatFunction === 'groupschat'">
	        	<p class="text-block-center">Leave group</p><a ng-click="LeaveGroup()" class=" v-align waves-effect waves-light btn red right settings-btn">Leave</a>
	        </div>
        <!-- Theme-option -->
	        <div class="card-content col s12 theme-settings" ng-if="themes.length > 1">
		        <div class="header">
		        	<p>Theme</p>
		        	<div class="right ">
		        		<p> Usage</p>
		        		<p ng-if="isChatAdmin">Active</p>
		        		<p ng-if="isChatAdmin">Delete</p>
		        	</div>
		        </div>
		        <div class="col s12 no-pad" ng-repeat="(key, theme) in themes" ng-if="!theme.is_general && !theme.is_deleted">
		        	<div class="theme-info">
	        			<div class="btn-floating waves-effect waves-light left v-align @{{theme.color}} icon">
				     	 	<i class="material-icons ">@{{theme.icon}}</i>
				    	</div>
			        	<p class="left">@{{theme.name}}</p>
		        	</div>
		        	<div class="right actions">
		        		<p class="left v-align usage">@{{theme.themeUsage}}</p>
		        		<div ng-if="isChatAdmin" class="left v-align checkbox">
							<input type="checkbox" class="filled-in" id="theme-active-box@{{key}}" checked="checked" ng-if="theme.is_active"/>
						    <input type="checkbox" class="filled-in" id="theme-active-box@{{key}}" ng-if="!theme.is_active"/>
						    <label ng-click="toggleTheme(theme.id , key, theme.color)" class="v-align"></label>
		        		</div>
		        		<a ng-if="isChatAdmin" class="left v-align delete"><i class="small material-icons col s2 red-text" ng-click="deleteTheme(theme.id, key)">delete</i></a>
		        	</div>
		        </div>
	        </div>
	    <!-- Group admin options -->
	    	<!-- head -->
	    	<div ng-if="chatFunction === 'groupschat'">
		        <div class="card-content col s12 ">
			        <div class="header">
			        	<p>Members</p>
			        	<div class="right" ng-if="isChatAdmin">
			        		<p>Admin</p>
			        		<p>Delete</p>	
			        	</div>
			        </div>
			        <!-- tables -->
			        <div class="col s12 no-pad" ng-repeat="(key, friend) in groupFriends" ng-if="friend.confirmed">
			        	<p class="text-block-center first-letter-capital">@{{ friend.name }}</p>
			        	<div class="right actions" ng-if="isChatAdmin">
		        		    <p class="checkbox left v-align ">
						      <input type="checkbox" class="filled-in" id="filled-in-box@{{key}}" checked="checked" ng-if="friend.admin" ng-click="toggleAdmin(friend.admin, friend.user_id, key)"/>
						      <input type="checkbox" class="filled-in" id="filled-in-box@{{key}}" ng-if="!friend.admin" ng-click="toggleAdmin(friend.admin, friend.user_id, key)"/>
						      <label for="filled-in-box@{{key}}" class="v-align"></label>
						    </p>
						    <a class="delete left v-align">
						      	<i class="small material-icons col s2 red-text" ng-click="deleteUserFromGroup(friend.user_id)">delete</i>
						    </a>
			        	</div>
			        </div>
		        </div>
	        </div>
		</div>
	</div>
</div>