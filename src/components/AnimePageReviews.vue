<template>
	<section class="reviews" v-if="reviewsArray.length">
		<anime-page-section-title
			:routerPath="{
				name: 'ReviewsPage',
				params: { animeId: currentAnime.mal_id },
			}"
			:viewMoreButton="reviewsArray.length > 4"
			>Reviews</anime-page-section-title
		>
		<ul class="reviews__list">
			<li
				class="reviews__item"
				v-for="review in reviewsArray.slice(0, 5)"
				:key="review.mal_id"
			>
				<img
					:src="review.user.images.jpg.image_url"
					alt="User image"
					class="reviews__user-image"
				/>
				<div class="reviews__info">
					<div class="reviews__date">
						{{ review.date }}
					</div>
					<div class="reviews__username">{{ review.user.username }}</div>
					<div class="reviews__text">
						{{ review.review.substring(0, 250) }}...
					</div>
				</div>
			</li>
		</ul>
	</section>
</template>

<script>
import AnimePageSectionTitle from '@/components/AnimePageSectionTitle.vue'
import { mapState } from 'vuex'
export default {
	components: {
		AnimePageSectionTitle,
	},

	computed: {
		...mapState({
			currentAnime: (state) => state.animePage.currentAnime,
			reviewsArray: (state) => state.animePage.reviewsArray,
		}),
	},
}
</script>

<style lang="sass" scoped>
.reviews
	margin-bottom: 50px

	@media (max-width: $screen-xs-max)
		margin-bottom: 25px

	&__title
		display: flex
		justify-content: space-between

	&__list
		padding: 0
		margin-top: 10px
		margin-bottom: 0
		list-style: none

	&__item
		padding: 10px
		display: flex
		align-items: flex-start
		border: 1px solid #a8a8a8
		overflow-x: hidden

		&:not(:last-child)
			margin-bottom: 10px

	&__user-image
		max-width: 60px
		margin-right: 10px
		display: block

	&__username
		margin-bottom: 5px
		font-weight: 700

	&__date
		margin-bottom: 5px
		font-size: 14px
</style>