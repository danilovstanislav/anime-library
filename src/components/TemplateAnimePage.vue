<template>
	<div class="container">
		<anime-page-sidebar />
		<main class="main">
			<anime-title />
			<h2 class="main__title">
				<slot name="title"> </slot>
			</h2>
			<slot name="mainContent"> </slot>
		</main>
	</div>
</template>

<script>
import AnimePageSidebar from '@/components/AnimePageSidebar.vue'
import AnimeTitle from '@/components/AnimeTitle.vue'
export default {
	components: {
		AnimePageSidebar,
		AnimeTitle,
	},
}
</script>

<style lang="sass" scoped>
.container
	@include container
	padding-top: 30px
	padding-bottom: 30px
	display: flex

	@media (max-width: $screen-xs-max)
		flex-direction: column
		font-size: 14px

	.main
		width: 100%
		max-width: calc(75% - 20px)
		display: flex
		flex-direction: column

		@media (max-width: $screen-xs-max)
			max-width: 100%

		&__title
			margin-top: 0
			margin-bottom: 10px
			font-size: 22px

			@media (max-width: $screen-xs-max)
				font-size: 16px
</style>