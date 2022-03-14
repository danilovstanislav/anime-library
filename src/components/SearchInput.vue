<template>
	<div class="search__input-wrapper">
		<label
			v-show="this.input.length"
			@click="this.input = ''"
			for="animeSearch"
			class="search__input__label"
		>
		</label>
		<input
			v-model="input"
			@keypress.enter="getAnimeList()"
			@input="debounceSearchResults()"
			class="search__input"
			type="text"
			placeholder="Search of anime"
			name="animeSearch"
		/>
		<SearchPageDropDown
			@closeDropdown="this.isDropdownOpen = false"
			@clearInput="this.input = ''"
			:searchResult="inputResultArray"
			:isOpen="isDropdownOpen"
		/>
		<button
			class="search__input__button"
			@click="getAnimeList()"
			:disabled="input.length <= 2"
		>
			<svg
				class="search__input-icon"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 512 512"
			>
				<path
					d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"
				/>
			</svg>
		</button>
	</div>
</template>

<script>
import SearchPageDropDown from '@/components/SearchPageDropDown.vue'
import _ from 'lodash'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
	components: {
		SearchPageDropDown,
	},

	data() {
		return {
			input: '',
			inputResultArray: [],
			isDropdownOpen: false,
		}
	},

	computed: {
		...mapState({
			searchedResults: (state) => state.searchPage.searchedResults,
			lastSearch: (state) => state.searchPage.lastSearch,
		}),
	},

	methods: {
		...mapMutations({
			SET_CURRENT_PAGE: 'searchPage/SET_CURRENT_PAGE',
			SET_SEARCHED_RESULTS: 'searchPage/SET_SEARCHED_RESULTS',
		}),

		...mapActions({
			getSearchResults: 'searchPage/getSearchResults',
			getInputDropdown: 'searchPage/getInputDropdown',
		}),

		debounceSearchResults: _.debounce(async function () {
			const res = await this.getInputDropdown(this.input)
			this.inputResultArray = res ?? []
		}, 1000),

		async getAnimeList() {
			this.isDropdownOpen = false
			if (this.input !== '' && this.input !== this.lastSearch) {
				this.SET_SEARCHED_RESULTS([])
			}
			await this.getSearchResults(this.input)
			// if (this.searchedResults.length) {
			// 	this.inputResultArray = []
			// }
			this.$router.replace({ name: 'SearchPage' })
			window.scroll({ top: 0, behavior: 'smooth' })
			this.input = ''
		},
	},

	watch: {
		input(val) {
			if (val.length >= 2) {
				this.SET_CURRENT_PAGE(1)
			}
			if (val.length < 2) {
				this.inputResultArray = []
			}
			val.length >= 2
				? (this.isDropdownOpen = true)
				: (this.isDropdownOpen = false)
		},
	},
}
</script>

<style lang="sass" scoped>
.search__input-wrapper
	width: 100%
	max-width: 440px
	height: 40px
	margin-bottom: 30px
	display: flex
	justify-content: center
	align-items: center
	position: relative

	.label-icon
		width: 13px
		height: 13px

.search__input
	width: 100%
	height: 100%
	padding-top: 6px
	padding-bottom: 6px
	padding-left: 10px
	padding-right: 30px
	border: 1px solid $dark-black-color
	border-radius: 10px 0 0 10px
	font-size: 18px

	&:focus
		outline: none

	&__label
		width: 15px
		height: 15px
		content: url(../assets/icons/delete-icon.svg)
		position: absolute
		top: 50%
		right: calc(40px + 2px)
		transform: translate(-50%, -50%)
		cursor: pointer

		&:hover
			opacity: .8

	&__button
		width: 40px
		height: 100%
		padding-left: 8px
		padding-right: 8px
		border: 1px solid $dark-black-color
		border-left: none
		border-radius: 0 10px 10px 0
		background-color: $bc-grey-color
		cursor: pointer
		transition: .2s ease

		&:hover
			box-shadow: 3px 0px 7px 1px lighten($light-black-color, 55%)

			.search__input-icon
				fill: $main-pink
</style>