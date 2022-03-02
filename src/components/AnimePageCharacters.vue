<template>
	<section class="characters" v-if="charactersArray.length">
		<anime-page-section-title
			:routerPath="{
				name: 'CharactersList',
				params: currentAnime.mal_id,
			}"
			:viewMoreButton="charactersArray.length > 6"
			>Characters</anime-page-section-title
		>
		<transition-group
			v-show="charactersArray.length"
			class="characters__list"
			tag="ul"
			name="characters-list"
			appear
		>
			<anime-page-characters-list-item
				v-for="char in slicedCharactersArray"
				:key="char.character.mal_id"
				:char="char"
			/>
		</transition-group>
	</section>
</template>

<script>
import AnimePageSectionTitle from '@/components/AnimePageSectionTitle.vue'
import AnimePageCharactersListItem from '@/components/AnimePageCharactersListItem.vue'
import { mapState } from 'vuex'

export default {
	components: {
		AnimePageSectionTitle,
		AnimePageCharactersListItem,
	},

	computed: {
		...mapState({
			currentAnime: (state) => state.animePage.currentAnime,
			charactersArray: (state) => state.animePage.charactersArray,
		}),

		slicedCharactersArray() {
			return this.charactersArray.slice(0, 6)
		},
	},
}
</script>

<style lang="sass" scoped>
.characters
	margin-bottom: 50px

	@media (max-width: $screen-xs-max)
		margin-bottom: 25px

	&__title
		display: flex
		justify-content: space-between

	&__list
		padding: 0
		margin-top: 10px
		margin-bottom: 0
		display: grid
		justify-items: center
		grid-template-columns: 1fr 1fr
		grid-gap: 10px
		list-style: none

		@media (max-width: $screen-xs-max)
			grid-template-columns: 1fr

.characters-list-enter-from
	opacity: 0
	transform: scale(0.6)

.characters-list-enter-to
	opacity: 1
	transform: scale(1)

.characters-list-enter-active
	transition: all .5s ease
</style>