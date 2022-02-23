<template>
	<h2 class="anime-title">
		{{
			$store.state.animePage.currentAnime.title_english
				? $store.state.animePage.currentAnime.title_english
				: $store.state.animePage.currentAnime.title
		}}
	</h2>
</template>

<script>
export default {}
</script>

<style lang="sass" scoped>
.anime-title
	margin-top: 0
	margin-bottom: 25px
	font-size: 24px
	font-weight: 800

	@media (max-width: $screen-xs-max)
		font-size: 18px
</style>