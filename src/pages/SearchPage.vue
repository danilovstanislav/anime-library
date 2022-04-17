<template>
	<section class="search">
		<div class="container">
			<SearchInput
				@getSearchResults="getSearchResults"
				@changeInputField="changeInputField"
			/>

			<SearchPageResults
				v-if="lastSearch || searchedResults.length"
				:searchedResults="searchedResults"
				:loadingResults="loading"
				:lastSearch="lastSearch"
				:selectedTypeCard="selectedTypeCard"
				@clearResults="clearResults"
			/>
			<div class="search__tip" v-else>
				Write the anime or character you want to find above.
			</div>
		</div>
	</section>
</template>

<script>
import SearchInput from '@/components/SearchInput.vue'
import SearchPageResults from '@/components/SearchPageResults.vue'
import { useSearchResults } from '@/composables/useSearchResults'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
	components: {
		SearchInput,
		SearchPageResults,
	},

	setup() {
		const {
			searchedResults,
			lastSearch,
			loading,
			error,
			currentPage,
			getResults,
		} = useSearchResults()

		const route = useRoute()
		const selectedTypeCard = ref(null)

		onMounted(() => {
			if (Object.keys(route.params).length) {
				clearResults()
				getSearchResults(route.params)
			} else {
				if (sessionStorage.searchedResults) {
					searchedResults.value = JSON.parse(sessionStorage.searchedResults)
				}

				if (sessionStorage.lastSearch) {
					lastSearch.value = sessionStorage.lastSearch
				}

				if (sessionStorage.selectedTypeCard) {
					selectedTypeCard.value = sessionStorage.selectedTypeCard
				}
			}
		})

		const changeInputField = () => (currentPage.value = 1)

		const getSearchResults = ({ inp, sel }) => {
			searchedResults.value = []
			lastSearch.value = inp
			selectedTypeCard.value = sel
			getResults(inp, sel)
		}

		const clearResults = () => {
			sessionStorage.removeItem('searchedResults')
			sessionStorage.removeItem('lastSearch')
			sessionStorage.removeItem('selectedTypeCard')
			searchedResults.value = []
			lastSearch.value = ''
		}

		return {
			selectedTypeCard,
			searchedResults,
			lastSearch,
			loading,
			error,
			currentPage,
			getResults,
			changeInputField,
			getSearchResults,
			clearResults,
		}
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
	@include sectionWrapper
	background-color: $bc-grey-color

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