<template>
	<section class="search">
		<div class="container">
			<div class="search__input-wrapper">
				<input
					class="search__input"
					type="text"
					v-model="input"
					placeholder="Search of anime"
					@keypress.enter="getAnimeList(input)"
				/>
				<button
					class="search__input__button"
					@click="getAnimeList(input)"
					:disabled="input.length < 3"
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
			<ul class="search__list" v-if="searchedArray.length">
				<li
					class="search__item"
					v-for="search in searchedArray"
					:key="search.mal_id"
				>
					<AnimeCard :animeCard="search" />
				</li>
			</ul>
			<div class="search__tip" v-else>
				Write the anime you want to find above.
			</div>
		</div>
	</section>
</template>

<script>
import AnimeCard from '@/components/AnimeCard.vue'
import axios from 'axios'
export default {
	components: {
		AnimeCard,
	},

	data() {
		return {
			input: '',
			searchedArray: [],
			fullData: null,
		}
	},

	created() {
		const storage = sessionStorage.getItem('searchedArray')
		if (storage) {
			this.searchedArray = JSON.parse(storage)
		}
	},

	methods: {
		async getAnimeList(inp) {
			if (inp.length < 3) {
				return
			}

			const searchParams = {
				q: inp,
				sort: 'desc',
				order_by: 'score',
			}

			const apiUrl = 'https://api.jikan.moe/v4/anime'

			try {
				const res = await axios({
					methods: 'GET',
					url: apiUrl,
					params: searchParams,
				})
				this.searchedArray = [...res.data.data]
				const firstRequest = res.data
				const pages = firstRequest.pagination.last_visible_page
				for (let i = 2; i <= pages; i++) {
					const res = await axios({
						methods: 'GET',
						url: apiUrl,
						params: {
							...searchParams,
							page: i,
						},
					})
					this.searchedArray = [...this.searchedArray, ...res.data.data]
				}

				sessionStorage.setItem(
					'searchedArray',
					JSON.stringify(this.searchedArray)
				)
			} catch (error) {
				console.error(error)
			}

			this.input = ''
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

	&__input-wrapper
		width: 100%
		margin-bottom: 30px
		display: flex
		justify-content: center
		align-items: center

	&__input
		width: 100%
		max-width: 400px
		height: 40px
		padding: 6px 10px
		border: 1px solid $dark-black-color
		border-radius: 10px 0 0 10px
		font-size: 18px

		&:focus
			outline: none

		&__button
			width: 40px
			height: 40px
			padding-left: 8px
			padding-right: 8px
			border: 1px solid $dark-black-color
			border-left: none
			border-radius: 0 10px 10px 0
			background-color: transparent
			cursor: pointer
			transition: .2s ease

			&:hover
				box-shadow: 3px 0px 7px 1px lighten($light-black-color, 55%)

				.search__input-icon
					fill: $main-color

		// &-icon
		// 	width: 20px
		// 	height: 20px
		// 	transition: .2s ease

	&__list
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

	&__tip
		position: absolute
		top: 50%
		left: 50%
		transform: translate(-50%, -50%)
		color: lighten($light-black-color, 25%)
		font-size: 24px
		font-family: 'Fredoka-SemiBold', sans-serif
</style>