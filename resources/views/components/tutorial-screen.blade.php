<div id="tutorial" class="hide">
	<!-- background with hole -->
	<div class="tutorial-screen js-tutorial-screen"></div>
	<!-- step 1 -->
	<div class="tutorial-div step-1 v-align center-align">
		@include('components.bubblesvg')
		<h2>Do you want see the tutorial?</h2>
		<a href="" class="btn red waves-effect waves-light js-close-tutorial">No thanks</a><a href="" class="btn waves-effect waves-light js-next-step">Yes please</a>
	</div>
	<!-- step 2 -->
	<div class="tutorial-div step-2 hide">
		<ul>
			<li>Logout</li>
			<li>Profile</li>
			<li>Friends</li>
			<li>Groups</li>
		</ul>
		<div class="tutorial-text">
			<h2 class="red-text text-darken-2">Side navigation</h2>
			<p>The side navigation contains 4 tabs namely: Logout, Profile, Friends and Groups. You use the side navigation to add friends, create groups, opening a chat windows , edit your profile or for just logging out.</p>
			<div class="step-buttons">
				<a href="" class="btn red waves-effect waves-light js-prev-step">&#60 back</a><a href="" class="btn waves-effect waves-light js-next-step">next step &#62</a>
			</div>
		</div>
	</div>
	<!-- step 3 -->
	<div class="tutorial-div step-3 hide">
		<div class="first-letter-capital friend-item js-give-active button-close-nav active">
				<p class="friend-name">Your Friend</p> 
				<span class="unread-messages v-align" >2</span>
				<span class="online-state online v-align"></span>
		</div>
		<ul class="friend-info">
			<li>Name</li>
			<li>Unread Messages</li>
			<li>Online status</li>
		</ul>
		<div class="tutorial-text">
			<h2 class="red-text text-darken-2">Start conversation</h2>
			<p>At the bottom of the friend tab you can add friends. If your friend accepts the friendrequest, he will appear here in your friendlist. When you click on your friend you will open the conversation in the main screen ( right from the side-bar ).</p>
			<div class="step-buttons">
				<a href="" class="btn red waves-effect waves-light js-prev-step">&#60 back</a><a href="" class="btn waves-effect waves-light js-next-step">next step &#62</a>
			</div>
		</div>
	</div>	
	<div class="add-friend-marker step-3 hide"></div>
	<!-- step 4 -->
	<div class="tutorial-div step-4 hide">
		<div class="tutorial-text">
			<h2 class="red-text text-darken-2">Creating themes</h2>
			<p>For each chat you can create custom themes. With themes it is easy to find messages of a specific category/theme. When you add keywords to your theme, messages that contains that keyword will automaticly be linked with this theme (You can also force messages to be linked on a theme).</p>
			<div class="step-buttons">
				<a href="" class="btn red waves-effect waves-light js-prev-step">&#60 back</a><a href="" class="btn waves-effect waves-light js-next-step">next step &#62</a>
			</div>
		</div>
	</div>
	<!-- step 5 -->
	<div class="tutorial-div step-5 hide">
		<div class="tutorial-text">
			<h2 class="red-text text-darken-2">Using themes</h2>
			<p>When you click on a theme you created (visible on the right-bottom of your screen), Only messages from that theme will become visible. You will also be able to send forced messages for that theme</p>
			<div class="step-buttons">
				<a href="" class="btn red waves-effect waves-light js-prev-step">&#60 back</a><a href="" class="btn waves-effect waves-light js-close-tutorial">done</a>
			</div>
		</div>
	</div>	
</div>

