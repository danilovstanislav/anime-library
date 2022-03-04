<template>
	<template-anime-page>
		<template v-slot:mainContent>
			<anime-page-about />
			<anime-page-characters />
			<anime-page-reviews />
			<anime-page-recommendations />
		</template>
	</template-anime-page>
</template>

<script>
import TemplateAnimePage from '@/components/TemplateAnimePage.vue'
import AnimePageAbout from '@/components/AnimePageAbout.vue'
import AnimePageCharacters from '@/components/AnimePageCharacters.vue'
import AnimePageReviews from '@/components/AnimePageReviews.vue'
import AnimePageRecommendations from '@/components/AnimePageRecommendations.vue'
import { mapActions } from 'vuex'

export default {
	components: {
		TemplateAnimePage,
		AnimePageAbout,
		AnimePageCharacters,
		AnimePageReviews,
		AnimePageRecommendations,
	},

	created() {
		this.getAnimeById(this.$route.params.animeId)
		this.getCharacters(this.$route.params.animeId)
		this.getReviews(this.$route.params.animeId)
	},

	methods: {
		...mapActions({
			getAnimeById: 'animePage/getAnimeById',
			getCharacters: 'animePage/getCharacters',
			getReviews: 'animePage/getReviews',
		}),
	},
}
</script>

<style lang='sass' scoped>
</style>