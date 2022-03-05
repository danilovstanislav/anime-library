<template>
	<div class="home">
		<h3 class="section__title">Winter 2022</h3>
		<slider v-slot="{ card }" :contentArr="seasonNow" sliderSize="wide">
			<anime-card :animeCard="card" />
		</slider>

		<h3 class="section__title">Top anime</h3>
		<slider v-slot="{ card }" :contentArr="topAnime" sliderSize="wide">
			<anime-card :animeCard="card" />
		</slider>

		<h3 class="section__title">Top upcoming anime</h3>
		<slider v-slot="{ card }" :contentArr="seasonUpcoming" sliderSize="wide">
			<anime-card :animeCard="card" />
		</slider>
	</div>
</template>

<script>
import Slider from '@/components/Slider.vue'
import AnimeCard from '@/components/AnimeCard.vue'
import AnimeVideoCard from '@/components/AnimeVideoCard.vue'
import { mapState, mapActions } from 'vuex'

export default {
	name: 'HomePage',
	components: {
		Slider,
		AnimeCard,
		AnimeVideoCard,
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
	padding-top: 50px
	padding-bottom: 50px
	background-color: #e6e6e6

.section__title
	@include container
	@include borderBottom
	padding-left: 10px
	padding-right: 10px
	padding-bottom: 2px
	margin-bottom: 10px
	color: #181818

	&:not(:first-child)
		margin-top: 30px
</style>