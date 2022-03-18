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
	padding-top: 40px
	padding-bottom: 40px
	background-color: $bc-grey-color

.slider__wrapper
	width: 100%
	margin: 0 auto

	&:not(:last-child)
		margin-bottom: 30px

	@media (max-width: $screen-m-max)
		max-width: 800px

	@media (max-width: $screen-s-max)
		max-width: 650px

	@media (max-width: $screen-xs-max)
		max-width: 400px

	&:deep(.card__image)
		height: 260px

		@media (max-width: $screen-m-max)
			height: 260px

		@media (max-width: $screen-s-max)
			height: 210px

		@media (max-width: $screen-xs-max)
			height: 170px

		@media (max-width: $screen-xs-min)
			height: 205px

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