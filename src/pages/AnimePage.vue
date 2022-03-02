<template>
	<template-anime-page>
		<template v-slot:mainContent>
			<anime-page-about />
			<anime-page-trailer />
			<anime-page-characters />
			<anime-page-reviews />
			<anime-page-recommendations />
		</template>
	</template-anime-page>
</template>

<script>
import TemplateAnimePage from '@/components/TemplateAnimePage.vue'
import AnimePageAbout from '@/components/AnimePageAbout.vue'
import AnimePageTrailer from '@/components/AnimePageTrailer.vue'
import AnimePageCharacters from '@/components/AnimePageCharacters.vue'
import AnimePageReviews from '@/components/AnimePageReviews.vue'
import AnimePageRecommendations from '@/components/AnimePageRecommendations.vue'
import { mapActions } from 'vuex'

export default {
	components: {
		TemplateAnimePage,
		AnimePageAbout,
		AnimePageTrailer,
		AnimePageCharacters,
		AnimePageReviews,
		AnimePageRecommendations,
	},

	created() {
		this.getAnimeById(this.$route.params.animeId)
	},

	methods: {
		...mapActions({
			getAnimeById: 'animePage/getAnimeById',
		}),
	},
}
</script>

<style lang='sass' scoped>
</style>