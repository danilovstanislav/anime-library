<template>
	<div class="results__list__wrapper">
		<ul class="results__list" ref="resultsList">
			<TransitionGroup
				@before-enter="onBeforeEnter"
				@enter="onEnter"
				@leave="onLeave"
				:css="false"
				appear
			>
				<li
					class="results__item"
					v-for="(search, index) in searchedResults"
					:key="search.mal_id"
					:data-index="index"
				>
					<AnimeCard :animeCard="search" />
				</li>
			</TransitionGroup>
		</ul>

		<div class="results__load-more" v-show="isLoadingMore">
			<span class="results__load-more__title"> Wait. Loading more </span>
			<LoadingCircle />
		</div>

		<div class="results__loading" v-show="isWaitForResponse">
			<span class="results__loading__title"> Loading </span>
			<LoadingCircle />
		</div>
	</div>
</template>

<script>
import AnimeCard from '@/components/AnimeCard.vue'
import LoadingCircle from '@/components/LoadingCircle.vue'
import { mapState, mapActions } from 'vuex'
import { gsap } from 'gsap'

export default {
	components: {
		AnimeCard,
		LoadingCircle,
	},

	data() {
		return {
			isLoadingMore: false,
		}
	},

	computed: {
		...mapState({
			searchedResults: (state) => state.searchPage.searchedResults,
			hasNextPage: (state) => state.searchPage.hasNextPage,
			isWaitForResponse: (state) => state.searchPage.isWaitForResponse,
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

		async scrollHandler() {
			const el = this.$refs.resultsList
			if (el) {
				if (
					el.getBoundingClientRect().bottom < window.innerHeight &&
					this.hasNextPage
				) {
					window.removeEventListener('scroll', this.scrollHandler)
					this.isLoadingMore = true
					await this.getSearchResults()
					this.isLoadingMore = false
				}
			} else return
		},

		onBeforeEnter(el) {
			el.style.opacity = 0
			el.style.transform = 'scale(0.6)'
		},

		onEnter(el, done) {
			gsap.to(el, {
				opacity: 1,
				transform: 'scale(1)',
				delay: el.dataset.index * 0.03,
				onComplete: done,
			})
		},

		onLeave(el, done) {
			gsap.to(el, {
				opacity: 0,
				transform: 'scale(0.6)',
				onComplete: done,
			})
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

.results__loading,
.results__load-more
	margin-top: 40px
	margin-bottom: 15px
	display: flex
	align-items: center
	justify-content: center

	&__title
		margin-right: 10px
		font-size: 24px
		font-family: 'Fredoka-Semibold', sans-serif
		animation: pulse 1s linear infinite alternate

.results__loading
	display: flex
	align-items: center
	justify-content: center
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