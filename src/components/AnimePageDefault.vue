<template>
	<anime-page-about />
	<anime-page-characters />
	<anime-page-reviews />
	<anime-page-recommendations />
</template>

<script>
import AnimePageAbout from '@/components/AnimePageAbout.vue'
import AnimePageCharacters from '@/components/AnimePageCharacters.vue'
import AnimePageReviews from '@/components/AnimePageReviews.vue'
import AnimePageRecommendations from '@/components/AnimePageRecommendations.vue'

export default {
	components: {
		AnimePageAbout,
		AnimePageCharacters,
		AnimePageReviews,
		AnimePageRecommendations,
	},
}
</script>