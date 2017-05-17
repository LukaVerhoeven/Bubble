<div id="chat-section" class="col s12 tab-item" ng-controller="MessageController">

	<!-- messages -->
	<div class="chat-box">
		<div class="chat" scroll ng-class="{min:boolChangeClass}" id="scrollMessages">
			<div lr-infinite-scroll="messages.nextPage()" infinite-scroll="messages.nextPage()" infinite-scroll-distance="2" infinite-scroll-container='".chat"' infinite-scroll-disabled="messages.busy">
				<div class="message-wrapper"  ng-repeat="message in messages.items | filter:{theme_id: message.filter}:true | reverse">
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
	</div>
	<div class="emoji-popup js-emoji-popup hide">
		@foreach ($emojis as $key => $emoji)
		<a class="js-emoji" data-value="{{$key}}">{{$emoji}}</a>
		@endforeach
	</div>
	<!-- chat input -->
	<div class="chat-input">
		<nav >
	    <div class="nav-wrapper white">
	      <form name="frmMessage" novalidate="">
	        <div class="input-field @{{message.color}}">
        	  <a class="insert-emo js-emoji-click"><img src="http://i.imgur.com/X85Q2Iu.png" alt="bubble emoticon"></a>
	          <input class="js-message" type="search" id="message-text" ng-model="message.text" ng-keypress="sendMessage($event)" autocomplete="off">
	          <label class="label-icon" for="message-text"></label>
	          <i class="material-icons send" ng-click="sendMessage(13)">send</i>
	        </div>
	      </form>
	    </div>
	  </nav>
	</div>
	 
	 <!-- filter -->
	 <div class="filter">
		<div class="side-nav z-depth-1">
		<form>
			<ul>	
			
			 {{-- TODO <p class="inline-block" style="width: 100%;height: 20px; font-size: 12px;">&#x1f604 &#x1f608</p> --}}
				<li class="no-button-container" ng-repeat="(key, theme) in themes" ng-if="!theme.is_general && theme.is_active && !theme.is_deleted">
					<input name="themeFilter" type="radio" id="themeFilter@{{key}}" ng-model="message.filter" ng-value="@{{theme.id}}" required/>
					<label for="themeFilter@{{key}}" class="no-button js-NIcon" ng-click="messageColor(theme.color)"></label>
					<div class="btn-floating waves-effect waves-light @{{theme.color}}">
	     	 			<i class="material-icons">@{{theme.icon}}</i>
	    			</div>
				</li>
				<li class="no-button-container" ng-if="chatID">
					<input name="themeFilter" type="radio" id="themeFilter@{{key}}" ng-model="message.filter" required/>
					<label for="themeFilter@{{key}}" class="no-button js-NIcon" ng-click="messageColor('')"></label>
					<div class="btn-floating waves-effect waves-light white">
	     	 			<i class="material-icons black-text ">cancel</i>
	    			</div>
				</li>

			</ul>
		</form>
		</div>
	 </div>
</div>