<template>
	<template-anime-page>
		<template v-slot:title> Reviews </template>
		<template v-slot:mainContent>
			<transition-group
				class="reviews__list"
				name="reviews-list"
				tag="ul"
				appear
			>
				<reviews-page-item
					v-for="review in reviewsArray"
					:key="review.mal_id"
					:review="review"
				/>
			</transition-group>
		</template>
	</template-anime-page>
</template>

<script>
import TemplateAnimePage from '@/components/TemplateAnimePage.vue'
import ReviewsPageItem from '@/components/ReviewsPageItem.vue'
import { mapState, mapActions } from 'vuex'

export default {
	components: {
		TemplateAnimePage,
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
	},
}
</script>

<style lang="sass" scoped>
.reviews__list
	padding-left: 0
	margin-top: 0
	margin-bottom: 0
	list-style: none

.reviews-list-enter-from
	opacity: 0
	transform: translateX(50%)

.reviews-list-enter-to
	opacity: 1
	transform: translateX(0)

.reviews-list-enter-active
	transition: all .5s ease
</style>