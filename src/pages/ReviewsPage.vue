<template>
	<div class="reviews">
		<anime-page-sidebar />
		<div class="reviews__main">
			<h2 class="reviews__title">Reviews</h2>
			<ul class="reviews__list">
				<li
					class="reviews__item"
					v-for="review in $store.state.animePage.reviewsArray"
					:key="review.mal_id"
				>
					<img :src="review.user.images.jpg.image_url" alt="User image" />
					<div class="reviews__item__username">
						{{ review.user.username }}
					</div>
					<div class="reviews__item__episodes-watched">
						{{ review.episodes_watched }}
					</div>
					<div class="reviews__item__review">
						{{ review.review }}
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import AnimePageSidebar from '@/components/AnimePageSidebar.vue'
export default {
	components: {
		AnimePageSidebar,
	},
}
</script>

<style lang="sass" scoped>
</style>