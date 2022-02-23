<template>
	<div class="character">
		<img
			class="character-image"
			:src="currentChar.images.jpg.image_url"
			alt="Character image"
		/>
		<div class="character__wrapper">
			<h3 class="character-name">
				{{ currentChar.name }}
			</h3>
			<p class="character-description">
				{{ currentChar.about }}
			</p>
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

	&-image
		max-width: 40%
		margin-right: 10px
		display: block
		object-fit: contain
		object-position: top

		@media(max-width: $screen-xs-max)
			max-width: 50%
			margin-right: auto
			margin-left: auto
			margin-bottom: 10px

	&-name
		margin-top: 0
		margin-bottom: 10px
		font-size: 22px

	&-description
		margin-top: 0
		margin-bottom: 0
		white-space: pre-line
</style>