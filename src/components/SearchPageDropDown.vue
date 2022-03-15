<template>
	<div class="dropdown__wrapper" v-show="isOpen">
		<ul class="dropdown__list" v-if="searchResult.length" ref="dropdown">
			<TransitionGroup
				@before-enter="onBeforeEnter"
				@enter="onEnter"
				@leave="onLeave"
				appear
			>
				<li
					class="dropdown__item"
					v-for="(search, index) in slicedSearchResult"
					:key="search.mal_id"
					:data-index="index"
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
							<div class="dropdown__item__title" :title="searchTitle(search)">
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
			</TransitionGroup>
		</ul>
		<div
			class="dropdown__not-found"
			v-if="searchResult.length === 0 && isGotResponse"
		>
			No results for "{{ input }}"
		</div>
		<div
			class="dropdown__loading"
			v-if="searchResult.length === 0 && !isGotResponse"
		>
			<span class="dropdown__loading__title">Loading</span>
			<LoadingCircle />
		</div>
	</div>
</template>

<script>
import LoadingCircle from '@/components/LoadingCircle.vue'
import { mapActions } from 'vuex'
import { gsap } from 'gsap'

export default {
	components: {
		LoadingCircle,
	},

	props: {
		input: {
			type: String,
		},
		searchResult: {
			type: Array,
			required: true,
		},
		isOpen: {
			type: Boolean,
		},
		isGotResponse: {
			type: Boolean,
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
			return this.searchResult.slice(0, 5)
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
			return epString ? `${type} | ${epString}` : type
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

		onBeforeEnter(el) {
			el.style.opacity = 0
			el.style.height = 0
		},

		onEnter(el, done) {
			gsap.to(el, {
				opacity: 1,
				height: 'auto',
				delay: el.dataset.index * 0.01,
				onComplete: done,
			})
		},

		onLeave(el, done) {
			gsap.to(el, {
				opacity: 0,
				height: 0,
				delay: el.dataset.index * 0.01,
				onComplete: done,
			})
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
	overflow: hidden
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

	&__info
		overflow: hidden

	&__image
		max-width: 40px
		margin-right: 10px
		display: block

	&__title
		font-family: 'Fredoka-SemiBold', sans-serif
		white-space: nowrap
		text-overflow: ellipsis

.dropdown__link
	width: 100%
	padding: 8px 12px
	display: flex
	align-items: flex-start
	border: none
	border-radius: 10px
	color: $dark-black-color
	text-decoration: none
	// white-space: nowrap
	// text-overflow: ellipsis
	// overflow: hidden
	transition: all .2s ease

	&:hover
		background-color: $main-pink
		color: #fff

.dropdown__not-found
	width: 100%
	padding: 10px 5px
	font-size: 18px
	text-align: center

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