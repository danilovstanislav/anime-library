<template>
	<div class="container">
		<AnimePageSidebar />
		<div class="main">
			<AnimeTitle />
			<AnimePageMainTabs />
			<router-view />
		</div>
	</div>
</template>

<script>
import AnimePageSidebar from '@/components/AnimePageSidebar.vue'
import AnimeTitle from '@/components/AnimeTitle.vue'
import AnimePageMainTabs from '@/components/AnimePageMainTabs.vue'
import { mapState, mapActions } from 'vuex'

export default {
	components: {
		AnimePageSidebar,
		AnimeTitle,
		AnimePageMainTabs,
	},

	created() {
		if (Object.keys(this.currentAnime).length === 0 && !this.isRequested) {
			this.getAnimeById(this.$route.params.animeId)
		}
	},

	unmounted() {
		this.removeAllData()
	},

	computed: {
		...mapState({
			isRequested: (state) => state.animePage.isRequested,
			currentAnime: (state) => state.animePage.currentAnime,
		}),
	},

	methods: {
		...mapActions({
			getAnimeById: 'animePage/getAnimeById',
			getCharacters: 'animePage/getCharacters',
			getReviews: 'animePage/getReviews',
			removeAllData: 'animePage/removeAllData',
		}),
	},
}
</script>

<style lang='sass' scoped>
.container
	@include container
	padding-top: 30px
	padding-bottom: 30px
	display: flex
	position: relative

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
</style>