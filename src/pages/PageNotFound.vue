<template>
	<section class="error">
		<h1 class="error__title">Sorry. Page not found. 😢</h1>
	</section>
</template>

<style lang="sass" scoped>
.error
	@include container
	@include sectionWrapper
	display: flex
	align-items: center
	justify-content: center

	&__title
		margin-top: 0
		margin-bottom: 0
		text-align: center

		@media(max-width: $screen-xs-max)
			font-size: 26px
</style>