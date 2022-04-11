<template>
	<div class="home" v-if="checkLength">
		<div class="container">
			<div class="slider__wrapper">
				<h2 class="section__title">Winter 2022</h2>
				<Slider v-slot="{ card }" :contentArr="seasonNow" sliderSize="wide">
					<AnimeCard :animeCard="card" />
				</Slider>
			</div>

			<div class="slider__wrapper">
				<h2 class="section__title">Top anime</h2>
				<Slider v-slot="{ card }" :contentArr="topAnime" sliderSize="wide">
					<AnimeCard :animeCard="card" />
				</Slider>
			</div>

			<div class="slider__wrapper">
				<h2 class="section__title">Top upcoming anime</h2>
				<Slider
					v-slot="{ card }"
					:contentArr="seasonUpcoming"
					sliderSize="wide"
				>
					<AnimeCard :animeCard="card" />
				</Slider>
			</div>
		</div>
	</div>
	<LoadingPage v-else />
</template>

<script>
import Slider from '@/components/Slider.vue'
import AnimeCard from '@/components/AnimeCard.vue'
import LoadingPage from '@/components/LoadingPage.vue'
import { mapState, mapActions } from 'vuex'

export default {
	name: 'HomePage',
	components: {
		Slider,
		AnimeCard,
		LoadingPage,
	},

	created() {
		this.getTopAnime()
		this.getSeasonNow()
		this.getSeasonUpcoming()
	},

	computed: {
		...mapState({
			topAnime: (state) => state.homePage.topAnime,
			seasonNow: (state) => state.homePage.seasonNow,
			seasonUpcoming: (state) => state.homePage.seasonUpcoming,
		}),

		checkLength() {
			return (
				this.topAnime.length &&
				this.seasonNow.length &&
				this.seasonUpcoming.length
			)
		},
	},

	methods: {
		...mapActions({
			getTopAnime: 'homePage/getTopAnime',
			getSeasonNow: 'homePage/getSeasonNow',
			getSeasonUpcoming: 'homePage/getSeasonUpcoming',
		}),
	},
}
</script>

<style lang="sass" scoped>
.home
	@include sectionWrapper
	padding-top: 40px
	padding-bottom: 40px
	background-color: $bc-grey-color

.slider__wrapper
	width: 100%
	margin: 0 auto

	&:not(:last-child)
		margin-bottom: 30px

	@media (max-width: $screen-l-max)
		max-width: calc($screen-m-max - 20px)

	@media (max-width: $screen-m-max)
		max-width: calc($screen-s-max - 20px)

	@media (max-width: $screen-s-max)
		max-width: calc($screen-xs-max - 20px)

	@media (max-width: $screen-xs-max)
		max-width: calc($screen-xs-min - 20px)

	@media (max-width: $screen-xs-min)
		max-width: 325px

	&:deep(.card__image)
		height: 265px

		@media (max-width: $screen-l-max)
			height: 255px

		@media (max-width: $screen-s-max)
			height: 200px

		@media (max-width: $screen-xs-max)
			height: 170px

		@media (max-width: $screen-xs-min)
			height: 235px

.container
	@include container

.section__title
	@include container
	@include borderBottom
	padding-bottom: 2px
	margin-bottom: 10px
	font-size: 22px
	color: $dark-black-color
</style>