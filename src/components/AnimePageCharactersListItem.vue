<template>
	<li class="characters__item">
		<router-link
			:to="{
				name: 'CharacterInfoPage',
				params: { charId: char.character.mal_id },
			}"
		>
			<img
				class="character__image"
				:src="char.character.images.jpg.image_url"
				alt="Character image"
			/>
		</router-link>
		<div class="character__info">
			<router-link
				class="character__name"
				:to="{
					name: 'CharacterInfoPage',
					params: { charId: char.character.mal_id },
				}"
				>{{ char.character.name }}</router-link
			>
			<div class="character__role">{{ char.role }}</div>
		</div>
	</li>
</template>

<script>
import { mapState } from 'vuex'

export default {
	props: ['char'],
	computed: {
		...mapState({
			charactersArray: (state) => state.animePage.charactersArray,
		}),
	},
}
</script>

<style lang="sass" scoped>
.characters__item
	width: 100%
	padding: 5px
	display: flex
	border: 1px solid #a8a8a8

	@media (max-width: $screen-m-max)
		max-width: 400px

.character__info
	display: inline-block

.character__image
	max-width: 60px
	margin-right: 10px
	display: block

.character__name
	margin-bottom: 5px
	font-weight: 700
	color: #000
	text-decoration: none

	&:hover
		text-decoration: underline
		color: $main-color
</style>