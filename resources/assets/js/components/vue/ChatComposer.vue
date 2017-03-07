<template lang="html">
	<div class="input-field">
		<!-- <input type="search" id="message-text" ng-model="message.text" ng-keypress="sendMessage($event)">
	    <label class="label-icon" for="search"><i class="material-icons">note_add</i></label>
	    <i class="material-icons send">send</i> -->

		<input type="text" id="message-text" v-model="newMessage" @keyup.enter="sendMessage">
	    <label class="label-icon" for="search" ><i class="material-icons">note_add</i></label>
	    <i class="material-icons send" @click="sendMessage">send</i>
	</div>
</template>

<script>
export default {
	data(){
		return{
			newMessage: ''
		}
	},
	methods: {
		sendMessage(){
			this.$emit('messagesent', {
				text: this.newMessage,
				id: 1 ,//retreive real id here
				theme:1,
				user: {
					name: 'testnaam'
				}
			});
			this.newMessage = '';
		}
	}
}
</script>

<style lang="css">
</style>
