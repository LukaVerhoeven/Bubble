<div id="profile" class="col s12 no-pad tab-item" ng-controller="ProfileController"> 
	<div class="fullh">
		<h2 class="side-header card">Your profile</h2>
		<div class="sidebar-container">
			<div class="valign-wrapper profile-info">
				<div class="img-container">
					<label class="col s4 no-pad  img-overflow circle center fixed" for="profilepicUpload">
						<div class="edit-overlay">
							<p class="edit-text v-align">Edit </p>
							<i class="material-icons v-align">mode_edit</i>
						</div>
						<img class="profile-pic" src="{{ Auth::user()->profile_image }}" alt="bubble profile image">
						<input type="file" name="profilepicUpload" id="profilepicUpload" accept="image/*" onchange="angular.element(this).scope().uploadImage(this.files)">
						<input type="submit" ng-click="uploadImage()">
					</label>
				</div>
			</div>

		<!-- username -->
	    	<div class="col s12 js-parent username">
		        <div class="right solid-block bubble-editName">
		          	<p class="left text-block-center js-edit-value js-username v-align first-letter-capital">{{ Auth::user()->name }}</p>
		          	<a class="left btn-floating btn red bubble-editButton v-align js-edit-button right">
			     	 	<i class="material-icons ">mode_edit</i>
			    	</a>
	          	</div>
	          	<div class="relative-container">
		          	<div class="right solid-block bubble-editInput col s12" >
			          	<input class="js-edit-input" type="text" placeholder="@{{chatname}}" ng-model="user.newUserName" maxlength="20">
			          	<div class="buttons right v-align">
				          	<a class=" btn-floating btn bubble-editButton" ng-click="editUserName()">
					     	 	<i class="material-icons">done</i>
					    	</a>
				          	<a class=" btn-floating btn bubble-editButton grey clear">
					     	 	<i class="material-icons">clear</i>
					    	</a>
			          	</div>
		          	</div>
	          	</div>
	        </div>

		<!-- email -->
	    	<div class="col s12 js-parent">
		        <div class="right solid-block bubble-editName" >
		          	<p class="left text-block-center js-edit-value js-email v-align">{{ Auth::user()->email }}</p>
		          	<a class="left btn-floating btn red bubble-editButton v-align js-edit-button right">
			     	 	<i class="material-icons ">mode_edit</i>
			    	</a>
	          	</div>
	          	<div class="relative-container">
		          	<div class="right solid-block bubble-editInput col s12">
			          	<input class="js-edit-input" type="text" placeholder="@{{chatname}}" ng-model="user.newUserEmail" maxlength="20" placeholder="{{ Auth::user()->email }}">
			          	<div class="buttons right v-align">
				          	<a class=" btn-floating btn bubble-editButton" ng-click="editUserEmail()">
					     	 	<i class="material-icons">done</i>
					    	</a>
				          	<a class=" btn-floating btn bubble-editButton grey clear">
					     	 	<i class="material-icons">clear</i>
					    	</a>
			          	</div>
		          	</div>
	          	</div>
	        </div>        
		</div>
	</div>
</div>