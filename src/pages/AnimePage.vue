<template>
	<section class="anime-page">
		<!-- <div class="container" v-if="Object.keys(this.currentAnime).length">
			<AnimePageSidebar />
			<div class="anime-page__main">
				<AnimeTitle />
				<AnimePageTabs />
			</div>
		</div>
		<LoadingPage v-else /> -->
	</section>
</template>

<script>
// import AnimePageSidebar from '@/components/AnimePageSidebar.vue'
// import AnimeTitle from '@/components/AnimeTitle.vue'
// import AnimePageTabs from '@/components/AnimePageTabs.vue'
// import LoadingPage from '@/components/LoadingPage.vue'
// import { mapState, mapActions } from 'vuex'
import { useAnimePage } from '@/api/useAnimePage'

export default {
	// components: {
	// 	AnimePageSidebar,
	// 	AnimeTitle,
	// 	AnimePageTabs,
	// 	LoadingPage,
	// },

	async mounted() {
		const { result } = await useAnimePage(this.$route.params.animeId)
	},

	unmounted() {
		// this.removeAllData()
	},

	computed: {
		// ...mapState({
		// 	isRequested: (state) => state.animePage.isRequested,
		// 	currentAnime: (state) => state.animePage.currentAnime,
		// }),
	},

	methods: {
		// ...mapActions({
		// 	getAnimeById: 'animePage/getAnimeById',
		// 	removeAllData: 'animePage/removeAllData',
		// }),
	},
}
</script>

<style lang='sass' scoped>
.anime-page
	@include sectionWrapper

.container
	@include container
	padding-top: 30px
	padding-bottom: 30px
	display: flex
	position: relative

	@media (max-width: $screen-xs-max)
		flex-direction: column
		font-size: 14px

.anime-page__main
	width: 100%
	max-width: calc(75% - 20px)
	display: flex
	flex-direction: column

	@media (max-width: $screen-xs-max)
		max-width: 100%
</style>