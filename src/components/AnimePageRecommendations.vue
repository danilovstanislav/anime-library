<template>
	<section class="recommendations" v-show="recommendationsArray.length">
		<anime-page-section-title>Recommendations</anime-page-section-title>
		<div class="recommendations__list">
			<slider
				v-slot="{ card }"
				:contentArr="recommendationsArray"
				sliderSize="small"
			>
				<router-link
					class="recommendations__item"
					:to="{
						name: 'AnimePage',
						params: { animeId: card.entry.mal_id },
					}"
					@click="recomendationsClickHandler(card.entry.mal_id)"
				>
					<img
						class="recommendations__image"
						:src="card.entry.images.jpg.image_url"
						alt="Anime image"
					/>
					<div class="recommendations__item-title">
						{{ card.entry.title }}
					</div>
				</router-link>
			</slider>
		</div>
	</section>
</template>

<script>
import AnimePageSectionTitle from '@/components/AnimePageSectionTitle.vue'
import Slider from '@/components/Slider.vue'
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
	components: {
		AnimePageSectionTitle,
		Slider,
	},

	data() {
		return {
			pageOffset: 0,
		}
	},

	computed: {
		...mapState({
			recommendationsArray: (state) => state.animePage.recommendationsArray,
		}),
	},

	methods: {
		...mapActions({
			getAnimeById: 'animePage/getAnimeById',
		}),

		...mapMutations({
			SET_ANIME_INFO: 'animePage/SET_ANIME_INFO',
			SET_TRAILER: 'animePage/SET_TRAILER',
			SET_CHARACTERS_ARRAY: 'animePage/SET_CHARACTERS_ARRAY',
			SET_REVIEWS_ARRAY: 'animePage/SET_REVIEWS_ARRAY',
			SET_RECOMMENDATIONS_ARRAY: 'animePage/SET_RECOMMENDATIONS_ARRAY',
		}),

		recomendationsClickHandler(id) {
			window.scroll({ top: 0, behavior: 'smooth' })
			// this.SET_ANIME_INFO = {}
			// this.SET_TRAILER = {}
			// this.SET_CHARACTERS_ARRAY = []
			// this.SET_REVIEWS_ARRAY = []
			// this.SET_RECOMMENDATIONS_ARRAY = []
			window.addEventListener('scroll', () => {
				if (window.pageYOffset === 0) {
					this.getAnimeById(id)
				}
			})
			window.removeEventListener
		},
	},
}
</script>

<style lang="sass" scoped>
.recommendations
	width: 100%

	&__list
		max-width: 100%
		padding: 0
		margin-top: 0
		margin-bottom: 0
		list-style: none

	&:deep(.slider__container)
		max-width: 100%
		padding: 0
		margin-top: 15px

		.swiper-button-prev,
		.swiper-button-next
			width: 38px
			height: 38px

			&::after
				color: $dark-black-color

	&__item
		display: block
		color: #000
		text-decoration: none
		border-radius: 5px
		overflow: hidden
		transition: all .2s ease

		&:hover
			opacity: .85

	&__image
		width: 100%
		height: 160px
		margin-bottom: 8px
		display: block
		object-fit: cover
		object-position: center

		@media (max-width: $screen-xs-max)
			height: 130px

	&__item-title
		font-weight: 700
		font-size: 14px
		white-space: nowrap
		text-overflow: ellipsis
		overflow: hidden
</style>