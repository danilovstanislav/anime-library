<template>
	<AnimePageMainAbout :textAbout="currentAnime.synopsis ?? ''" />
	<AnimePageMainCharacters :charactersArray="charactersArray" />
	<AnimePageMainReviews :reviewsArray="reviewsArray" />
	<AnimePageMainRecommendations :recommendationsArray="recommendationsArray" />
</template>

<script>
import AnimePageMainAbout from '@/components/AnimePageMainAbout.vue'
import AnimePageMainCharacters from '@/components/AnimePageMainCharacters.vue'
import AnimePageMainReviews from '@/components/AnimePageMainReviews.vue'
import AnimePageMainRecommendations from '@/components/AnimePageMainRecommendations.vue'

export default {
	components: {
		AnimePageMainAbout,
		AnimePageMainCharacters,
		AnimePageMainReviews,
		AnimePageMainRecommendations,
	},

	props: {
		currentAnime: Object,
		charactersArray: Array,
		reviewsArray: Array,
		recommendationsArray: Array,
	},
}
</script>