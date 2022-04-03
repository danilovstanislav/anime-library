<template>
	<section class="home">
		<div class="container" v-if="checkLength">
			<div class="slider__wrapper" v-if="airingAnime.length">
				<h2 class="section__title">Airing</h2>
				<Slider v-slot="{ card }" :contentArr="airingAnime" sliderSize="wide">
					<AnimeCard :animeCard="card" />
				</Slider>
			</div>
			<button @click="fetch">click</button>
			<div class="slider__wrapper" v-if="upcomingAnime.length">
				<h2 class="section__title">Upcoming anime</h2>
				<Slider v-slot="{ card }" :contentArr="upcomingAnime" sliderSize="wide">
					<AnimeCard :animeCard="card" />
				</Slider>
			</div>
			<div class="slider__wrapper" v-if="allAnime.length">
				<h2 class="section__title">Top anime</h2>
				<Slider v-slot="{ card }" :contentArr="allAnime" sliderSize="wide">
					<AnimeCard :animeCard="card" />
				</Slider>
			</div>
		</div>
		<LoadingPage v-else />
	</section>
</template>

<script>
import Slider from '@/components/Slider.vue'
import AnimeCard from '@/components/AnimeCard.vue'
import LoadingPage from '@/components/LoadingPage.vue'
import { useRanking } from '@/api/useRanking'
import { useAnimePage } from '@/api/useAnimePage'

export default {
	name: 'HomePage',
	components: {
		Slider,
		AnimeCard,
		LoadingPage,
	},

	data() {
		return {
			airingAnime: [],
			upcomingAnime: [],
			allAnime: [],
		}
	},

	async mounted() {
		const { result: airingRes } = await useRanking('airing')
		this.airingAnime = airingRes

		const { result: upcomingRes } = await useRanking('upcoming')
		this.upcomingAnime = upcomingRes

		const { result: allAnimeRes } = await useRanking('all')
		this.allAnime = allAnimeRes
	},

	computed: {
		checkLength() {
			return (
				this.airingAnime.length ||
				this.upcomingAnime.length ||
				this.allAnime.length
			)
		},
	},

	methods: {
		fetch() {
			useAnimePage('1')
		}
	}
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