<div id="Alerts" class="Alerts" ng-controller="AlertController">
	<!-- DeleteFriend dialogbox-->
	<div id="DeleteFriendAlert" class="alertbox">
	  <!-- Modal content -->
	  <div class="modal-content">
	    <span class="close">&times;</span>
	    <p>You sure you want to remove this friend</p>
	    <a class="btn waves-effect waves-light" ng-click="deleteFriendConfirmed()">I'm sure</a>
	    <a class="btn waves-effect waves-light red" ng-click="Close()">No!</a>
	  </div>
	</div>
</div>