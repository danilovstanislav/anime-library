<template>
	<div class="characters">
		<anime-page-sidebar />
		<div class="characters__main">
			<h2 class="characters__title">Characters</h2>
			<ul class="characters__list">
				<characters-list-item
					v-for="char in $store.state.animePage.charactersArray"
					:key="char.character.mal_id"
					:char="char"
				/>
			</ul>
		</div>
	</div>
</template>

<script>
import AnimePageSidebar from '@/components/AnimePageSidebar.vue'
import CharactersListItem from '@/components/CharactersListItem.vue'

export default {
	components: {
		AnimePageSidebar,
		CharactersListItem,
	},
}
</script>

<style lang="sass" scoped>
.characters
	@include container
	padding-top: 30px
	padding-bottom: 30px
	display: flex

	@media (max-width: $screen-xs-max)
		flex-direction: column
		font-size: 14px

	&__main
		width: 100%
		max-width: calc(75% - 20px)
		display: flex
		flex-direction: column

		@media (max-width: $screen-xs-max)
			max-width: 100%

	&__title
		margin-top: 0
		margin-bottom: 10px

	&__list
		width: 100%
		padding-left: 0
		margin-top: 0
		margin-bottom: 0
		display: flex
		flex-direction: column
		list-style: none
</style>