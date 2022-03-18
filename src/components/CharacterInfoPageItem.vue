<template>
	<div class="character">
		<Transition @before-enter="beforeEnter" @enter="onEnter">
			<img
				v-if="charImage"
				ref="characterImage"
				class="character__image"
				:src="charImage"
				:alt="charName ?? 'Character image'"
			/>
		</Transition>

		<div class="character__wrapper">
			<Transition @before-enter="beforeEnter" @enter="onEnter" appear>
				<h2 class="character__name" v-if="charName" ref="charName">
					{{ charName }}
				</h2>
			</Transition>

			<Transition @before-enter="beforeEnter" @enter="onEnter" appear>
				<p
					v-if="charAbout"
					ref="about"
					class="character__description"
					:class="{
						'no-info': !!charAbout,
					}"
				>
					{{ charAbout ?? "Sorry we don't have any information" }}
				</p>
			</Transition>
		</div>
	</div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getCurrentCharacter } from '@/api/character'
import { gsap } from 'gsap'

export default {
	async setup() {
		const route = useRoute()
		const charId = route.params.charId
		const { charImage, charName, charAbout } = await getCurrentCharacter(charId)

		const beforeEnter = (el) => {
			console.log(el)
			el.style.opacity = 0
			el.style.transform = 'scaleX(0.6)'
		}

		const onEnter = (el) => {
			gsap.to(el, {
				opacity: 1,
				transform: 'scaleX(1)',
				duration: 0.4,
			})
		}

		return {
			charImage,
			charName,
			charAbout,
			beforeEnter,
			onEnter,
		}
	},
}
</script>

<style lang="sass" scoped>
.character
	@include container
	padding-top: 30px
	padding-bottom: 30px
	position: relative
	display: flex
	align-items: flex-start
	justify-content: flex-start

	@media(max-width: $screen-xs-max)
		flex-direction: column
		align-items: center

	&__image
		width: 100%
		max-width: 300px
		margin-right: 15px
		display: block
		object-fit: contain
		object-position: top

		@media(max-width: $screen-xs-max)
			margin-bottom: 10px

	&__name
		margin-top: 0
		margin-bottom: 15px
		font-size: 24px

	&__description
		margin-top: 0
		margin-bottom: 0
		white-space: pre-line

	&__error
		width: 100%
		padding-left: 10px
		padding-right: 10px
		margin-top: 0
		margin-bottom: 0
		position: absolute
		top: 30%
		left: 50%
		transform: translate(-50%, -50%)
		text-align: center
		font-size: 28px

		@media(max-width: $screen-xs-max)
			font-size: 22px

.no-info
	font-style: italic

// .character-image-enter-active,
// .character-name-enter-active,
// .character-description-enter-active
// 	transition: all .4s ease

// .character-image-enter-from
// 	opacity: 0
// 	transform: scaleX(0.6)

// .character-image-enter-to
// 	opacity: 1
// 	transform: scaleX(1)

// .character-name-enter-to
// 	opacity: 1
// 	transform: translateX(0)

// .character-name-enter-from
// 	opacity: 0
// 	transform: translateY(-20px)

// .character-description-enter-from
// 	opacity: 0
// 	transform: translateX(50px)

// .character-description-enter-to
// 	opacity: 1
// 	transform: translateX(0)
</style>