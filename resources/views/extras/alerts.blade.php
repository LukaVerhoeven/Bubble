<div id="Alerts" class="Alerts" ng-controller="AlertController">
<!-- friends -->
	<!-- DeleteFriend dialogbox-->
	<div id="DeleteFriendAlert" class="alertbox" ng-click="Close()">
	  <!-- Modal content -->
	  <div class="modal-content" ng-click="$event.stopPropagation()">
	    <span class="close">&times;</span>
	    <p>You sure you want to remove this friend</p>
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
				<a href="#!" class="secondary-content" ng-click="addFriendToGroupAlert(group.chat_id)">
					<i class="material-icons">add</i>
			    </a>
	    	</li>
	    </ul>
	  </div>
	</div>
<!-- groupschat -->

</div>