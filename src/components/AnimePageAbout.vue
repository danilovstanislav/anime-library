<template>
	<section class="about">
		<anime-page-section-title>About</anime-page-section-title>
		<p class="about__text" v-show="currentAnime.synopsis">
			{{ isReadMoreClicked ? textAbout : shortTextAbout }}
		</p>
		<button
			class="about__button"
			@click="isReadMoreClicked = !isReadMoreClicked"
			v-if="textAbout.length > 250"
		>
			{{ isReadMoreClicked ? 'Read less' : 'Read more' }}
		</button>
	</section>
</template>

<script>
import AnimePageSectionTitle from '@/components/AnimePageSectionTitle.vue'
import { mapState } from 'vuex'

export default {
	components: {
		AnimePageSectionTitle,
	},

	data() {
		return {
			isReadMoreClicked: false,
		}
	},

	computed: {
		...mapState({
			currentAnime: (state) => state.animePage.currentAnime,
		}),

		textAbout() {
			return this.currentAnime.synopsis || ''
		},

		shortTextAbout() {
			return this.textAbout.length > 250
				? this.textAbout.substring(0, 250) + '...'
				: this.textAbout
		},
	},
}
</script>

<style lang="sass" scoped>
.about
	margin-bottom: 30px

	@media (max-width: $screen-xs-max)
		margin-bottom: 15px

	&__text
		margin-top: 5px
		margin-bottom: 10px

	&__button
		@include button
		font-size: 12px
</style>