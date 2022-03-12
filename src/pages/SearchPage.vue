<template>
	<section class="search">
		<div class="container">
			<SearchInput @setSearchedArray="setSearchedArray" />
			<button
				class="search__remove-button"
				@click="removeHandler"
				v-if="searchedArray.length"
			>
				Clear list
			</button>
			<SearchPageResults
				v-if="searchedArray.length"
				:searchedArray="searchedArray"
			/>
			<div class="search__tip" v-else>
				Write the anime you want to find above.
			</div>
		</div>
	</section>
</template>

<script>
import SearchInput from '@/components/SearchInput.vue'
import SearchPageResults from '@/components/SearchPageResults.vue'

export default {
	components: {
		SearchInput,
		SearchPageResults,
	},

	data() {
		return {
			searchedArray: [],
		}
	},

	created() {
		const storage = sessionStorage.getItem('searchedArray')
		if (storage) {
			this.searchedArray = JSON.parse(storage)
		}
	},

	unmounted() {
		this.inputResultArray = []
	},

	methods: {
		removeHandler() {
			sessionStorage.setItem('searchedArray', [])
			this.searchedArray = []
		},

		setSearchedArray(res) {
			this.searchedArray = res
		},
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

	&__remove-button
		@include button
		height: 40px
		padding-left: 10px
		padding-right: 10px
		margin-left: 15px
		font-size: 16px

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