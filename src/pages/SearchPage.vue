<template>
	<section class="search">
		<div class="container">
			<SearchInput />

			<div class="results__title" v-if="searchedResults.length">
				<span class="results__title__content"> Search results for </span>
				<span class="results__title__search"> "{{ lastSearch }}" </span>
				<button
					class="results__remove-button"
					@click="clearResults"
					v-if="searchedResults.length"
				>
					<svg
						class="results__remove-button-icon"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						viewBox="0 0 348.333 348.334"
					>
						<g>
							<path
								d="M336.559,68.611L231.016,174.165l105.543,105.549c15.699,15.705,15.699,41.145,0,56.85
		c-7.844,7.844-18.128,11.769-28.407,11.769c-10.296,0-20.581-3.919-28.419-11.769L174.167,231.003L68.609,336.563
		c-7.843,7.844-18.128,11.769-28.416,11.769c-10.285,0-20.563-3.919-28.413-11.769c-15.699-15.698-15.699-41.139,0-56.85
		l105.54-105.549L11.774,68.611c-15.699-15.699-15.699-41.145,0-56.844c15.696-15.687,41.127-15.687,56.829,0l105.563,105.554
		L279.721,11.767c15.705-15.687,41.139-15.687,56.832,0C352.258,27.466,352.258,52.912,336.559,68.611z"
							/>
						</g>
					</svg>
					Clear all
				</button>
			</div>
			<SearchPageResults />
			<div class="search__tip" v-if="lastSearch === '' && !isWaitForResponse">
				Write the anime you want to find above.
			</div>
		</div>
	</section>
</template>

<script>
import SearchInput from '@/components/SearchInput.vue'
import SearchPageResults from '@/components/SearchPageResults.vue'
import { mapState, mapActions } from 'vuex'

export default {
	components: {
		SearchInput,
		SearchPageResults,
	},

	computed: {
		...mapState({
			lastSearch: (state) => state.searchPage.lastSearch,
			searchedResults: (state) => state.searchPage.searchedResults,
			isWaitForResponse: (state) => state.searchPage.isWaitForResponse,
		}),
	},

	methods: {
		...mapActions({
			getSearchResults: 'searchPage/getSearchResults',
			clearResults: 'searchPage/clearResults',
		}),
	},
}
</script>

<style lang="sass" scoped>
.container
	@include container
	padding-top: 30px
	padding-bottom: 30px
	display: flex
	flex-direction: column
	justify-content: flex-start
	align-items: center

.search
	position: relative
	background-color: $bc-grey-color

	.results__title
		width: 100%
		margin-bottom: 20px
		display: flex
		justify-content: center
		align-items: center
		font-size: 18px

		&__search
			margin-left: 5px
			font-weight: 700
			font-size: 20px

		.results__remove-button
			padding-left: 0
			padding-right: 0
			padding-bottom: 3px
			margin-left: 15px
			display: flex
			align-items: center
			align-self: flex-end
			border: none
			border-bottom: 2px dashed $light-black-color
			background-color: transparent
			line-height: 1
			font-size: 16px
			cursor: pointer
			transition: all .2s ease

			&:hover
				opacity: .8

			&-icon
				width: 12px
				height: 12px
				margin-right: 5px
				fill: $light-black-color

	&__tip
		position: absolute
		top: 50%
		left: 50%
		transform: translate(-50%, -50%)
		color: lighten($light-black-color, 25%)
		font-size: 24px
		font-family: 'Fredoka-SemiBold', sans-serif
		text-align: center
</style>