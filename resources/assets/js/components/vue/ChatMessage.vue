<template lang="html">
  <div>
    <p> {{message.text}} </p>
    <small>{{ message.id }}</small>
  </div>
</template>

<script>
export default {
	props: ['message']
}
</script>

<style lang="css">
</style>
