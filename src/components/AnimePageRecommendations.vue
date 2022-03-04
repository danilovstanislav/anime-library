<template>
	<section class="recommendations" v-if="recommendationsArray.length">
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
					@click="scrollTop(card.entry.mal_id)"
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
import axios from 'axios'
import { mapActions } from 'vuex'
export default {
	components: {
		AnimePageSectionTitle,
		Slider,
	},

	data() {
		return {
			recommendationsArray: [],
		}
	},

	created() {
		this.getRecommendations(this.$route.params.animeId)
	},

	methods: {
		...mapActions({
			getAnimeById: 'animePage/getAnimeById',
		}),

		scrollTop(id) {
			window.scroll({ top: 0, behavior: 'smooth' })
			if (window.pageYOffset === 0) {
				this.getAnimeById(id)
			}
		},

		async getRecommendations(id) {
			try {
				const res = await axios.get(
					`https://api.jikan.moe/v4/anime/${id}/recommendations`
				)
				this.recommendationsArray = res.data.data
			} catch (err) {
				console.error(err)
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