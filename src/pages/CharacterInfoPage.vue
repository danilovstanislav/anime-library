<template>
	<section class="character">
		<div class="container" v-if="Object.keys(currentChar).length">
			<Transition class="character__image" name="character-image" appear>
				<img
					:src="currentChar.images.jpg.image_url"
					:alt="currentChar.name ?? 'Character image'"
				/>
			</Transition>
			<div class="character__wrapper">
				<Transition name="character-name" appear>
					<h2 class="character__name">
						{{ currentChar.name }}
					</h2>
				</Transition>
				<Transition name="character-description" appear>
					<p
						class="character__description"
						:class="{
							'no-info': !currentChar.about,
						}"
					>
						{{ aboutText }}
					</p>
				</Transition>
			</div>
		</div>
		<div class="character__error" v-else-if="error">
			<h2 class="character__error__title">
				Ooops... Something went wrong. Try reloading. 😢
			</h2>
			<ReloadButton />
		</div>
		<LoadingPage v-else />
	</section>
</template>

<script>
import LoadingPage from '@/components/LoadingPage.vue'
import ReloadButton from '@/components/ReloadButton.vue'
import axios from 'axios'

export default {
	components: {
		LoadingPage,
		ReloadButton,
	},

	data() {
		return {
			currentChar: {},
			error: false,
		}
	},

	created() {
		this.getCurrentChar(this.$route.params.charId)
	},

	unmounted() {
		this.currentChar = {}
	},

	computed: {
		aboutText() {
			return this.currentChar.about ?? 'Sorry, information is not available'
		},
	},

	methods: {
		async getCurrentChar(id) {
			try {
				const res = await axios.get(`https://api.jikan.moe/v4/characters/${id}`)
				this.currentChar = res.data.data
				this.error = false
			} catch (err) {
				console.error(err)
				const errStatus = err.response.data.status
				if (errStatus >= 400 && errStatus <= 500) {
					this.error = true
				}
			}
		},
	},
}
</script>

<style lang="sass" scoped>
.character
	@include sectionWrapper
	padding-top: 30px
	padding-bottom: 30px

	.container
		@include container
		display: flex
		align-items: flex-start

		@media(max-width: $screen-xs-max)
			flex-direction: column

	&__image
		width: 100%
		max-width: 300px
		padding-left: 10px
		padding-right: 10px
		margin-right: 15px
		display: block
		object-fit: contain
		object-position: top

		@media(max-width: $screen-xs-max)
			margin-right: auto
			margin-left: auto
			margin-bottom: 10px

	&__name
		margin-top: 0
		margin-bottom: 10px
		font-size: 24px

	&__description
		margin-top: 0
		margin-bottom: 0
		white-space: pre-line

	&__error
		width: 100%
		padding-left: 10px
		padding-right: 10px
		display: flex
		flex-direction: column
		align-items: center
		justify-content: center
		position: absolute
		top: 30%
		left: 50%
		transform: translate(-50%, -50%)

		@media(max-width: $screen-xs-max)
			font-size: 22px

		&__title
			margin-top: 0
			margin-bottom: 10px
			text-align: center
			font-size: 28px

.no-info
	font-style: italic

.character-image-enter-active,
.character-name-enter-active,
.character-description-enter-active
	transition: all .4s ease

.character-image-enter-from
	opacity: 0
	transform: scaleX(0.6)

.character-image-enter-to
	opacity: 1
	transform: scaleX(1)

.character-name-enter-to
	opacity: 1
	transform: translateX(0)

.character-name-enter-from
	opacity: 0
	transform: translateY(-20px)

.character-description-enter-from
	opacity: 0
	transform: translateX(50px)

.character-description-enter-to
	opacity: 1
	transform: translateX(0)
</style>