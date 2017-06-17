<div id="chat-section" class="col s12 tab-item" ng-controller="MessageController">

	<!-- messages -->
	<div class="chat-box">
		<div class="chat" scroll ng-class="{min:boolChangeClass}" id="scrollMessages">
			<div lr-infinite-scroll="messages.nextPage()" infinite-scroll="messages.nextPage()" infinite-scroll-distance="2" infinite-scroll-container='".chat"' infinite-scroll-disabled="messages.busy" class="message-scroll-container">
				<div class="message-wrapper"  ng-repeat="message in messages.items | filter:{theme_id: message.filter}:true | reverse">
					<div ng-if="message.user_id != Authuserid" class="friend-message inline-block message-block">
						<div class="img-container hide-on-small-only">
							<div class="col s4 no-pad  img-overflow circle left image">
								<img class="friend-pic" ng-src="@{{ message.profile_image }}" alt="Bubble profile image" >
							</div>
						</div>
						<div class="left message-container">
							<div class="block">
								<p class="user-name first-letter-capital">@{{ message.nickname }}</p>
							</div>
							<div class="inline-block text-container left">
								<i class="bubble-icon triangle left"><path class="path1"></path><path class="path2 @{{message.color}}-before"></path></i>
								<div class="message section card left @{{message.color}}-border">
									<p>@{{ message.text }}</p>
								</div>
							</div>							
						</div>
					</div>
					<div ng-if="message.user_id == Authuserid" class="auth-message inline-block message-block">
					<!-- your image -->
					<!-- 	<div class="col s4 no-pad  img-overflow circle center right image">
						<img class="profile-pic" src="{{ Auth::user()->profile_image }}" alt="Bubble profile image">
					</div> -->
						<div class="right message-container">
							<div class="block">
								<p class="right-align user-name">You</p>
							</div>
							<div class="inline-block text-container right">
								<i class="bubble-icon triangle-you right"><path class="path1"></path><path class="path2 @{{message.color}}-before"></path></i>
								<div class="message section card right-align right @{{message.color}}-border">
									<p>@{{ message.text }}</p>
								</div>
							</div>
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
	        <div class="input-field @{{message.color}}-border">
        	  <a class="insert-emo js-emoji-click"><i class="bubble-icon smiley @{{message.color}}-text"></i></a>
	          <input class="js-message" type="search" id="message-text" ng-model="message.text" ng-keypress="sendMessage($event)" autocomplete="off" maxlength="2000" placeholder="write a message">
	          <label class="label-icon" for="message-text"></label>
	          <i class="material-icons send @{{message.color}}-text" ng-click="sendMessage(13)">send</i>
	        </div>
	      </form>
	    </div>
	  </nav>
	</div>
	 
	 <!-- filter -->
	 <div class="filter">
		<div class="side-nav z-depth-1 hide-scrollbar">
		<form>
			<ul ng-if="themes.length > 1" class="theme-list">
				<!-- all themes of the chat -->
				<li class="filter-button-container" ng-repeat="(key, theme) in themes" ng-if="!theme.is_general && theme.is_active && !theme.is_deleted">
					<input name="themeFilter" type="radio" id="themeFilter@{{key}}" ng-model="message.filter" ng-value="@{{theme.id}}"/>
					<label for="themeFilter@{{key}}" class="no-button js-NIcon" ng-click="messageColor(theme.color)"></label>
					<div class="btn-floating waves-effect waves-light @{{theme.color}}">
	     	 			<i class="material-icons">@{{theme.icon}}</i>
	    			</div>
				</li>
				<!-- reset themes -->
				<li class="filter-button-container" ng-if="chatID">
					<input name="themeFilter" type="radio" id="themeFilter" ng-model="message.filter"/>
					<label for="themeFilter" class="no-button js-NIcon" ng-click="messageColor('')"></label>
					<div class="btn-floating waves-effect waves-light white">
	     	 			<i class="material-icons red-text ">clear</i>
	    			</div>
				</li>
			</ul>
			<!-- demo theme for the tutorial -->
			<ul class="theme-list hide js-tutorial-filter">
				<li class="filter-button-container ">
					<div class="btn-floating waves-effect waves-light blue">
	     	 			<i class="material-icons">school</i>
	    			</div>
				</li>				
			</ul>
		</form>
		</div>
	 </div>
</div>