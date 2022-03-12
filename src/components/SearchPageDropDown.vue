<template>
	<div class="dropdown__wrapper" v-show="isOpen">
		<ul class="dropdown__list" v-if="searchResult.length" ref="dropdown">
			<li
				class="dropdown__item"
				v-for="search in slicedSearchResult"
				:key="search.mal_id"
			>
				<router-link
					class="dropdown__link"
					:to="{ name: 'AnimePageMain', params: { animeId: search.mal_id } }"
					@click="dropdownClickHandler(search.mal_id)"
				>
					<img
						class="dropdown__item__image"
						:src="search.images.jpg.image_url"
						:alt="searchTitle(search) ?? 'Anime image'"
					/>
					<div class="dropdown__item__info">
						<div class="dropdown__item__title">
							{{ searchTitle(search) }}
						</div>
						<div class="dropdown__item__episodes">
							{{ searchEpisodesAndType(search) }}
						</div>
						<div class="dropdown__item__year">
							{{ cardYear(search) }}
						</div>
					</div>
				</router-link>
			</li>
		</ul>
		<div class="dropdown__loading" v-else>
			<span class="dropdown__loading__title">Loading</span>
			<LoadingCircle />
		</div>
	</div>
</template>

<script>
import LoadingCircle from '@/components/LoadingCircle.vue'
import { mapActions } from 'vuex'

export default {
	components: {
		LoadingCircle,
	},

	props: {
		searchResult: {
			type: Array,
			required: true,
		},

		isOpen: {
			type: Boolean,
			required: true,
		},
	},

	mounted() {
		window.addEventListener('click', (e) => {
			if (e.target !== this.$refs.dropdown) {
				this.$emit('closeDropdown')
			}
		})
	},

	computed: {
		slicedSearchResult() {
			return this.searchResult.slice(0, 6)
		},
	},

	methods: {
		searchTitle(search) {
			return search.title_english ? search.title_english : search.title
		},

		searchEpisodesAndType(search) {
			const ep = search.episodes
			const epString = ep ? ep + ' ep.' : null
			const type = search.type ?? ''
			return epString ? `${epString} | ${type}` : type
		},

		cardYear(search) {
			const year = search.aired.prop.from.year
			return year ? year : 'Soon'
		},

		...mapActions({
			getAnimeById: 'animePage/getAnimeById',
			removeAllData: 'animePage/removeAllData',
		}),

		dropdownClickHandler(id) {
			const scrollToTop = () => {
				if (window.pageYOffset === 0) {
					this.removeAllData()
					this.getAnimeById(id)
					window.removeEventListener('scroll', scrollToTop)
				}
			}

			if (window.pageYOffset === 0) {
				this.removeAllData()
				this.getAnimeById(id)
			} else {
				window.addEventListener('scroll', scrollToTop)
				window.scroll({ top: 0, behavior: 'smooth' })
			}
			this.$emit('clearInput')
		},
	},
}
</script>

<style lang="sass" scoped>
.dropdown__wrapper
	width: 100%
	max-width: 440px
	position: absolute
	top: calc(100% + 5px)
	left: 0
	z-index: 100
	background-color: #fff
	border-radius: 10px
	border: 1px solid $dark-black-color

.dropdown__list
	width: 100%
	padding: 3px
	margin-top: 0
	margin-bottom: 0
	list-style-type: none

.dropdown__item
	width: 100%

.dropdown__link
	width: 100%
	padding: 8px 12px
	display: flex
	align-items: flex-start
	border: none
	border-radius: 10px
	color: $dark-black-color
	text-decoration: none
	white-space: nowrap
	text-overflow: ellipsis
	overflow: hidden
	transition: all .2s ease

	&:hover
		background-color: $main-pink
		color: #fff

	.dropdown__item__image
		max-width: 40px
		margin-right: 10px
		display: block

	// .dropdown__item__title
	// 	white-space: nowrap
	// 	text-overflow: ellipsis
	// 	overflow: hidden

.dropdown__loading
	width: 100%
	padding: 3px
	display: flex
	align-items: center
	justify-content: center

	&__title
		margin-right: 20px
		font-size: 18px
		font-weight: 700
</style>