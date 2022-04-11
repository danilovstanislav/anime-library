<template>
	<div class="results__list__wrapper">
		<div class="results__title" v-if="searchedResults.length">
			<span class="results__title__content"> Search results for </span>
			<span class="results__title__search"> "{{ lastSearch }}" </span>
			<button class="results__remove-button" @click="$emit('clearResults')">
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
		<ul class="results__list" v-if="searchedResults.length">
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

		<!-- <div class="results__load-more" v-if="isLoadingMore">
			<span class="results__load-more__title"> Wait. Loading more </span>
			<LoadingCircle />
		</div> -->

		<div
			class="results__loading"
			v-else-if="loadingResults && searchedResults.length === 0"
		>
			<span class="results__loading__title"> Loading </span>
			<LoadingCircle />
		</div>

		<div
			class="results__not-found"
			v-else
		>
			No results for "{{ lastSearch }}"
		</div>
	</div>
</template>

<script>
import AnimeCard from '@/components/AnimeCard.vue'
import LoadingCircle from '@/components/LoadingCircle.vue'
import { gsap } from 'gsap'

export default {
	components: {
		AnimeCard,
		LoadingCircle,
	},

	props: {
		searchedResults: {
			type: Array,
			required: true,
		},
		loadingResults: Boolean,
		lastSearch: String,
	},

	emits: {
		clearResults: null,
	},

	data() {
		return {
			isLoadingMore: false,
		}
	},

	mounted() {
		window.addEventListener('scroll', this.scrollHandler)
	},

	unmounted() {
		window.removeEventListener('scroll', this.scrollHandler)
	},

	methods: {
		onBeforeEnter(el) {
			el.style.opacity = 0
			el.style.transform = 'scale(0.6)'
		},

		onEnter(el, done) {
			gsap.to(el, {
				opacity: 1,
				transform: 'scale(1)',
				delay: el.dataset.index * 0.06,
				duration: 0.3,
				onComplete: done,
			})
		},

		onLeave(el, done) {
			gsap.to(el, {
				opacity: 0,
				transform: 'scale(0.6)',
				duration: 0.3,
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

.results__not-found
	position: absolute
	top: 35%
	left: 50%
	transform: translateX(-50%)
	font-size: 22px
	font-family: 'Fredoka-SemiBold', sans-serif
</style>