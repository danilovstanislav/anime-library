<template>
	<section class="reviews">
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
	</section>
</template>

<script>
import ReviewsPageItem from '@/components/ReviewsPageItem.vue'
import { gsap } from 'gsap'

export default {
	components: {
		ReviewsPageItem,
	},

	props: {
		reviewsArray: Array,
	},

	methods: {
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