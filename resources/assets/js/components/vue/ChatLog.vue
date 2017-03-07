<template lang="html">
		<div class="chat">
			<chat-message class="message section card" v-for="message in messages" :message="message" ></chat-message>
			<div class="message section card" v-show="messages.length === 0">
				Nothing here yet
			</div>
		</div>
</template>

<script>
export default {
	props: ['messages']
}
</script>

<style lang="css">
</style>
