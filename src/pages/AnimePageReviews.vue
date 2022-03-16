<template>
	<h2 class="reviews__title">Reviews</h2>
	<ul class="reviews__list">
		<TransitionGroup @before-enter="onBeforeEnter" @enter="onEnter" appear>
			<ReviewsPageItem
				v-for="(review, index) in reviewsArray"
				:key="review.mal_id"
				:data-index="index"
				:review="review"
			/>
		</TransitionGroup>
	</ul>
</template>

<script>
import ReviewsPageItem from '@/components/ReviewsPageItem.vue'
import { mapState, mapActions } from 'vuex'
import { gsap } from 'gsap'

export default {
	components: {
		ReviewsPageItem,
	},

	created() {
		if (this.reviewsArray.length === 0) {
			this.getReviews(this.$route.params.animeId)
		}
	},

	computed: {
		...mapState({
			reviewsArray: (state) => state.animePage.reviewsArray,
		}),
	},

	methods: {
		...mapActions({
			getReviews: 'animePage/getReviews',
		}),

		onBeforeEnter(el) {
			el.style.opacity = 0
			el.style.transform = 'scaleX(0.5)'
		},

		onEnter(el, done) {
			gsap.to(el, {
				opacity: 1,
				transform: 'scaleX(1)',
				delay: el.dataset.index * 0.1,
				onComplete: done,
			})
		},
	},
}
</script>

<style lang="sass" scoped>
.reviews__list
	padding-left: 0
	margin-top: 0
	margin-bottom: 0
	list-style: none

.reviews__title
	margin-top: 0
	margin-bottom: 10px
</style>