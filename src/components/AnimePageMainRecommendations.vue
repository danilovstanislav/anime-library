<template>
	<section class="recommendations" v-show="recommendationsArray.length">
		<AnimePageMainSectionTitle>Recommendations</AnimePageMainSectionTitle>
		<div class="recommendations__list">
			<slider
				v-slot="{ card }"
				:contentArr="recommendationsArray"
				sliderSize="small"
			>
				<router-link
					class="recommendations__item"
					:to="{
						name: 'AnimePageMain',
						params: { animeId: card.entry.mal_id },
					}"
					@click="recomendationsClickHandler(card.entry.mal_id)"
				>
					<img
						class="recommendations__image"
						:src="card.entry.images.jpg.image_url"
						alt="Anime image"
					/>
					<div class="recommendations__item-title" :title="card.entry.title">
						{{ card.entry.title }}
					</div>
				</router-link>
			</slider>
		</div>
	</section>
</template>

<script>
import AnimePageMainSectionTitle from '@/components/AnimePageMainSectionTitle.vue'
import Slider from '@/components/Slider.vue'
import { mapState, mapActions } from 'vuex'
export default {
	components: {
		AnimePageMainSectionTitle,
		Slider,
	},

	computed: {
		...mapState({
			recommendationsArray: (state) => state.animePage.recommendationsArray,
		}),
	},

	methods: {
		...mapActions({
			getAnimeById: 'animePage/getAnimeById',
			removeAllData: 'animePage/removeAllData',
		}),

		recomendationsClickHandler(id) {
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

		.swiper-button-prev
			left: 5px

		.swiper-button-next
			right: 5px

	&__item
		display: block
		color: #000
		text-decoration: none
		border-radius: 10px
		overflow: hidden
		transition: all .2s ease

		&:hover
			opacity: .85

	&__image
		width: 100%
		height: 185px
		margin-bottom: 8px
		display: block
		object-fit: cover
		object-position: center

		@media (max-width: $screen-m-max)
			height: 170px

		@media (max-width: $screen-s-max)
			height: 175px

		@media (max-width: $screen-xs-max)
			height: 205px

		@media (max-width: $screen-xs-min)
			height: 215px

	&__item-title
		font-family: 'Fredoka-SemiBold'
		font-size: 15px
		white-space: nowrap
		text-overflow: ellipsis
		overflow: hidden
</style>