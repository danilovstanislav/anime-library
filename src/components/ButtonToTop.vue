<template>
	<button class="button-scroll-to-top" @click="scrollToTop">↑</button>
</template>
<script>
export default {
	methods: {
		scrollToTop() {
			window.scroll({ top: 0, behavior: 'smooth' })
			// let maxHeight = Math.max(
			// 	document.body.scrollHeight,
			// 	document.documentElement.scrollHeight,
			// 	document.body.offsetHeight,
			// 	document.documentElement.offsetHeight,
			// 	document.body.clientHeight,
			// 	document.documentElement.clientHeight
			// )
		},
	},
}
</script>
<style lang="sass">
.button-scroll-to-top
	@include button
	width: 50px
	height: 50px
	padding: 0
	display: block
	position: fixed
	bottom: 35px
	right: 30px
	font-size: 22px
	z-index: 10
</style>