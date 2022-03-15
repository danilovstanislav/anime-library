<template>
	<section class="about" v-show="currentAnime.synopsis">
		<AnimePageMainSectionTitle>About</AnimePageMainSectionTitle>
		<p
			class="about__text"
			:class="{ opened: isReadMoreClicked }"
			ref="textAbout"
		>
			{{ textAbout }}
		</p>
		<button class="about__button" @click="clickHandler">
			{{ isReadMoreClicked ? 'Read less' : 'Read more' }}
		</button>
	</section>
</template>

<script>
import AnimePageMainSectionTitle from '@/components/AnimePageMainSectionTitle.vue'
import { mapState } from 'vuex'
import { gsap } from 'gsap'

export default {
	components: {
		AnimePageMainSectionTitle,
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
			return this.currentAnime.synopsis ?? ''
		},
	},

	methods: {
		clickHandler() {
			this.isReadMoreClicked = !this.isReadMoreClicked
			if (this.isReadMoreClicked) {
				gsap.fromTo(
					this.$refs.textAbout,
					{ height: '70px' },
					{ height: 'auto', duration: 0.2 }
				)
			} else {
				gsap.to(this.$refs.textAbout, { height: '70px', duration: 0.2 })
			}
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
		height: 70px
		margin-top: 10px
		margin-bottom: 10px
		position: relative
		overflow-y: hidden

		&::after
			width: 100%
			height: 100%
			content: ''
			position: absolute
			bottom: 0
			left: 0
			background: linear-gradient(to top, rgba(255,255,255, 1) 20%, rgba(255,255,255, 0) 80%)
			pointer-events: none

	&__button
		@include button
		font-size: 12px

.opened
	&::after
		display: none
</style>