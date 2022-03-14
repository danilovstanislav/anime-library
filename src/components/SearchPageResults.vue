<template>
	<div class="results__list__wrapper">
		<ul class="results__list" ref="resultsList" v-if="searchedResults.length">
			<li
				class="results__item"
				v-for="search in searchedResults"
				:key="search.mal_id"
			>
				<AnimeCard :animeCard="search" />
			</li>
		</ul>
		<div class="results__loading" v-else>
			<span class="results__loading__title"> Loading </span>
			<LoadingCircle />
		</div>
	</div>
</template>

<script>
import AnimeCard from '@/components/AnimeCard.vue'
import LoadingCircle from '@/components/LoadingCircle.vue'
import { mapState, mapActions } from 'vuex'

export default {
	components: {
		AnimeCard,
		LoadingCircle,
	},

	computed: {
		...mapState({
			searchedResults: (state) => state.searchPage.searchedResults,
			hasNextPage: (state) => state.searchPage.hasNextPage,
		}),
	},

	mounted() {
		window.addEventListener('scroll', this.scrollHandler)
	},
	unmounted() {
		window.removeEventListener('scroll', this.scrollHandler)
	},
	updated() {
		window.addEventListener('scroll', this.scrollHandler)
	},

	methods: {
		...mapActions({
			getSearchResults: 'searchPage/getSearchResults',
		}),

		scrollHandler() {
			const el = this.$refs.resultsList
			if (el) {
				if (
					el.getBoundingClientRect().bottom < window.innerHeight &&
					this.hasNextPage
				) {
					this.getSearchResults()
					window.removeEventListener('scroll', this.scrollHandler)
				}
			} else return
		},
	},
}
</script>

<style lang="sass" scoped>
.results__list__wrapper
	&:deep(.loader)
		width: 37px
		height: 37px
		border: 4px solid darken($bc-grey-color, 20%)
		border-top: 4px solid $main-pink

.results__list
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

.results__loading
	display: flex
	align-items: center
	position: absolute
	top: 35%
	left: 50%
	transform: translateX(-50%)

	&__title
		margin-right: 10px
		font-size: 24px
		font-family: 'Fredoka-Semibold', sans-serif
		animation: pulse 1s linear infinite alternate

@keyframes pulse
	0%
		opacity: .5
	100%
		opacity: 1
</style>