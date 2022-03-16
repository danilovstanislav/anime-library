<template>
	<Transition @before-enter="onBeforeEnter" @enter="onEnter" appear>
		<h1 class="anime-title">
			{{ animeTitle }}
		</h1>
	</Transition>
</template>

<script>
import { mapState } from 'vuex'
import { gsap } from 'gsap'

export default {
	computed: {
		...mapState({
			currentAnime: (state) => state.animePage.currentAnime,
		}),

		animeTitle() {
			return this.currentAnime.title_english
				? this.currentAnime.title_english
				: this.currentAnime.title
		},
	},

	methods: {
		onBeforeEnter(el) {
			el.style.opacity = 0
			el.style.transform = 'translateY(-150%)'
		},

		onEnter(el) {
			gsap.to(el, {
				opacity: 1,
				transform: 'translateX(0)',
				duration: 0.7,
				ease: 'Bounce.easeOut',
			})
		},
	},
}
</script>

<style lang="sass" scoped>
.anime-title
	margin-top: 0
	margin-bottom: 20px
	font-size: 26px
	font-weight: 800

	@media (max-width: $screen-xs-max)
		margin-bottom: 10px
		display: none
		font-size: 18px
</style>