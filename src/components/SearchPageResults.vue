<template>
	<ul class="search__list">
		<li
			class="search__item"
			v-for="search in searchedArray"
			:key="search.mal_id"
		>
			<AnimeCard :animeCard="search" />
		</li>
	</ul>
</template>

<script>
import AnimeCard from '@/components/AnimeCard.vue'

export default {
	props: {
		searchedArray: {
			type: Array,
			required: true,
		},
	},

	components: {
		AnimeCard,
	},
}
</script>

<style lang="sass" scoped>
.search__list
	padding-left: 0
	margin-top: 0
	margin-bottom: 0
	display: grid
	grid-template-columns: repeat(5, 180px)
	grid-gap: 15px
	list-style-type: none

	@media(max-width: $screen-m-max)
		grid-template-columns: repeat(4, 160px)
		grid-gap: 10px

	@media(max-width: $screen-s-max)
		grid-template-columns: repeat(3, 160px)

	@media(max-width: $screen-xs-max)
		grid-template-columns: repeat(2, 140px)

	&:deep(.card__image)
		height: 255px

		@media(max-width: $screen-m-max)
			height: 225px

		@media(max-width: $screen-xs-max)
			height: 200px
</style>