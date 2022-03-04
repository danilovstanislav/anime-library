<template>
	<template-anime-page>
		<template v-slot:title> Characters </template>
		<template v-slot:mainContent>
			<transition-group
				class="characters__list"
				tag="ul"
				name="characters-list"
				appear
			>
				<characters-list-item
					v-for="char in charactersArray"
					:key="char.character.mal_id"
					:char="char"
				/>
			</transition-group>
		</template>
	</template-anime-page>
</template>

<script>
import TemplateAnimePage from '@/components/TemplateAnimePage.vue'
import AnimePageSidebar from '@/components/AnimePageSidebar.vue'
import CharactersListItem from '@/components/CharactersListItem.vue'
import { mapState, mapActions } from 'vuex'

export default {
	components: {
		TemplateAnimePage,
		AnimePageSidebar,
		CharactersListItem,
	},

	created() {
		if (this.charactersArray === []) {
			this.getCharacters(this.$route.params.animeId)
		}
	},

	computed: {
		...mapState({
			charactersArray: (state) => state.animePage.charactersArray,
		}),
	},

	methods: {
		...mapActions({
			getCharacters: 'animePage/getCharacters',
		}),
	},
}
</script>

<style lang="sass" scoped>
.characters__list
	width: 100%
	padding-left: 0
	margin-top: 0
	margin-bottom: 0
	display: flex
	flex-direction: column
	list-style: none

.characters-list-enter-from
	opacity: 0
	transform: scale(0.6)

.characters-list-enter-to
	opacity: 1
	transform: scale(1)

.characters-list-enter-active
	transition: all .4s ease
</style>