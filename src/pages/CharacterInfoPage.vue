<template>
	<div class="character" v-show="currentChar">
		<transition name="character-image" appear>
			<img
				class="character__image"
				:src="currentChar.images?.jpg.image_url"
				alt="Character image"
			/>
		</transition>
		<div class="character__wrapper">
			<transition name="character-name" appear>
				<h3 class="character__name" v-show="currentChar.name">
					{{ currentChar.name }}
				</h3>
			</transition>
			<transition name="character-description" appear>
				<p class="character__description">
					{{ currentChar.about ?? 'Sorry we do not have any information 😥' }}
				</p>
			</transition>
		</div>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	data() {
		return {
			currentChar: {},
		}
	},

	created() {
		this.getCurrentChar(this.$route.params.charId)
	},

	methods: {
		async getCurrentChar(id) {
			try {
				const res = await axios.get(`https://api.jikan.moe/v4/characters/${id}`)
				this.currentChar = res.data.data
			} catch (err) {
				console.error(err)
			}
		},
	},
}
</script>

<style lang="sass" scoped>
.character
	@include container
	padding-top: 30px
	padding-bottom: 30px
	display: flex

	@media(max-width: $screen-xs-max)
		flex-direction: column

	&__image
		width: 40%
		max-width: 300px
		margin-right: 10px
		display: block
		object-fit: contain
		object-position: top

		@media(max-width: $screen-xs-max)
			max-width: 50%
			margin-right: auto
			margin-left: auto
			margin-bottom: 10px

	&__name
		margin-top: 0
		margin-bottom: 10px
		font-size: 22px

	&__description
		margin-top: 0
		margin-bottom: 0
		white-space: pre-line

.character-image-enter-active,
.character-name-enter-active,
.character-description-enter-active
	transition: all .4s ease

.character-image-enter-from
	opacity: 0
	transform: scale(0.6)

.character-image-enter-to
	opacity: 1
	transform: scale(1)

.character-name-enter-to
	opacity: 1
	transform: translateX(0)

.character-name-enter-from
	opacity: 0
	transform: translateY(-20px)

.character-description-enter-from
	transform: translateX(100px)

.character-description-enter-to
	transform: translateX(0)
</style>