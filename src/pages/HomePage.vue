<template>
	<div class="home">
		<h3 class="section__title">Winter 2022</h3>
		<slider
			v-slot="{ card }"
			:contentArr="$store.state.homePage.seasonNow"
			sliderSize="wideSlider"
		>
			<anime-card :animeCard="card" />
		</slider>

		<h3 class="section__title">Top anime</h3>
		<slider
			v-slot="{ card }"
			:contentArr="$store.state.homePage.topAnime"
			sliderSize="wideSlider"
		>
			<anime-card :animeCard="card" />
		</slider>

		<h3 class="section__title">Top upcoming anime</h3>
		<slider
			v-slot="{ card }"
			:contentArr="$store.state.homePage.seasonUpcoming"
			sliderSize="wideSlider"
		>
			<anime-card :animeCard="card" />
		</slider>
	</div>
</template>

<script>
import Slider from '@/components/Slider.vue'
import AnimeCard from '@/components/AnimeCard.vue'
import AnimeVideoCard from '@/components/AnimeVideoCard.vue'
import { mapActions } from 'vuex'

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