<template>
	<div class="loader"></div>
</template>

<script>
export default {}
</script>

<style lang="sass" scoped>
.loader
	width: 30px
	height: 30px
	border: 4px solid $bc-grey-color
	border-radius: 50%
	border-top: 4px solid $main-pink
	animation: spin .5s linear infinite

@keyframes spin
	0%
		transform: rotate(0deg)
	100%
		transform: rotate(360deg)
</style>