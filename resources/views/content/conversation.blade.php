<div id="chat-section" class="col s12 tab-item" ng-controller="MessageController">

	<!-- messages -->
	<div class="chat-box">
		<div class="chat">
			<div class="message-wrapper"  ng-repeat="message in messages">
				<div ng-if="message.user_id != Authuserid">
					<p>@{{ message.name }}</p>
					<div class="message section card @{{message.color}}">
						@{{ message.text }}
					</div>
					<div class="col s4 no-pad  img-overflow circle left">
						<img class="friend-pic" ng-src="@{{ message.profile_image }}" alt="Bubble profile image" >{{-- error --}}
					</div>
				</div>
				<div ng-if="message.user_id == Authuserid">
					<p class="right-align">You</p>
					<div class="message section card right-align @{{message.color}}">
						@{{ message.text }}
					</div>
				<div class="col s4 no-pad  img-overflow circle center right">
					<img class="profile-pic" src="{{ Auth::user()->profile_image }}" alt="Bubble profile image">
				</div>
				</div>
			</div>
		</div>
	</div>

	<!-- chat input -->
	<div class="chat-input">
		<nav >
	    <div class="nav-wrapper white">
	      <form name="frmMessage" novalidate="">
	        <div class="input-field">
	          <input type="search" id="message-text" ng-model="message.text" ng-keypress="sendMessage($event)" autocomplete="off">
	          <label class="label-icon" for="search"><i class="material-icons">note_add</i></label>
	          <i class="material-icons send" ng-click="sendMessage(13)">send</i>
	        </div>
	      </form>
	    </div>
	  </nav>
	</div>
	 
	 <!-- filter -->
	 <div class="filter">
		<div class="side-nav z-depth-1">
			<ul>
				<li><a href=""></a></li>
				<li><a href=""></a></li>
				<li><a href=""></a></li>
				<li><a href=""></a></li>
				<li><a href=""></a></li>
			</ul>
		</div>
	 </div>
</div>