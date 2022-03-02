<template>
	<section class="trailer" v-if="trailerVideo">
		<anime-page-section-title>Official trailer</anime-page-section-title>
		<iframe
			class="trailer__video"
			:src="trailerVideo"
			frameborder="0"
			allowfullscreen
		>
		</iframe>
	</section>
</template>

<script>
import AnimePageSectionTitle from '@/components/AnimePageSectionTitle.vue'
import { mapState } from 'vuex'

export default {
	components: {
		AnimePageSectionTitle,
	},

	computed: {
		...mapState({
			trailerVideo: (state) => state.animePage.trailerVideo,
		}),
	},
}
</script>

<style lang="sass" scoped>
.trailer
	margin-bottom: 50px

	@media (max-width: $screen-xs-max)
		margin-bottom: 25px

	&__video
		max-width: 330px
		width: 100%
		height: 200px
		margin-left: auto
		margin-right: auto
		margin-top: 15px
		display: block
</style>