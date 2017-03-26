<div id="chat-section" class="col s12 tab-item" ng-controller="MessageController">

	<!-- messages -->
	<div class="chat-box">
		<div class="chat">
			<div ng-repeat="message in messages" class="message section card">
				@{{ message.text }}
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
	          <i class="material-icons send">send</i>
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