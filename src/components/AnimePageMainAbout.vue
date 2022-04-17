<template>
	<section class="about">
		<AnimePageMainSectionTitle>About</AnimePageMainSectionTitle>
		<p
			class="about__text"
			ref="textAbout"
			:class="{ opened: isReadMoreClicked }"
		>
			{{ textAbout }}
		</p>
		<button
			class="about__button"
			@click="readMoreText"
			v-if="textAboutLength >= 250"
		>
			{{ isReadMoreClicked ? 'Read less' : 'Read more' }}
		</button>
	</section>
</template>

<script>
import AnimePageMainSectionTitle from '@/components/AnimePageMainSectionTitle.vue'
import { gsap } from 'gsap'

export default {
	components: {
		AnimePageMainSectionTitle,
	},

	props: {
		textAbout: String,
	},

	data() {
		return {
			isReadMoreClicked: false,
		}
	},

	computed: {
		textAboutLength() {
			return this.textAbout.length
		},
	},

	methods: {
		readMoreText() {
			this.isReadMoreClicked = !this.isReadMoreClicked
			if (this.isReadMoreClicked) {
				gsap.to(this.$refs.textAbout, {
					height: 'auto',
					duration: 0.2,
					ease: 'Power3.easeOut',
				})
			} else {
				gsap.to(this.$refs.textAbout, {
					height: '60px',
					duration: 0.2,
					ease: 'Power3.easeOut',
				})
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
		height: 60px
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
			background: linear-gradient(to top, rgba(255,255,255, 1) 15%, rgba(255,255,255, 0) 80%)
			pointer-events: none

	&__button
		@include button
		font-size: 12px

.opened
	&::after
		display: none
</style>