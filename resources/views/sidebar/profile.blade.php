<div id="profile" class="col s12 no-pad tab-item" ng-controller="ProfileController"> 
	<div>
		<div class="valign-wrapper profile-info">
			<label class="col s4 no-pad  img-overflow circle center fixed" for="profilepicUpload">
				<div class="edit-overlay"></div>
				<img class="profile-pic" src="{{ Auth::user()->profile_image }}" alt="">
				<input type="file" name="profilepicUpload" id="profilepicUpload" accept="image/*" onchange="angular.element(this).scope().uploadImage(this.files)">
				<input type="submit" ng-click="uploadImage()">
			</label>
		</div>
	{{-- <div class="col s8 fixed"si>
		<h1 class="bubble-username">{{ Auth::user()->name }}</h1>
		<h2 class="bubble-email">{{ Auth::user()->email }}</h2>
	</div> --}}
	</div>
</div>