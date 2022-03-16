<template>
	<li class="reviews__item">
		<img
			class="reviews__item__image"
			:src="review.user.images.jpg.image_url"
			alt="User image"
		/>
		<div class="reviews__item__wrapper">
			<div class="reviews__item__username">
				{{ review.user.username }}
			</div>
			<div
				class="reviews__item__review"
				:class="{ opened: isReadMoreClicked }"
				ref="reviewContent"
			>
				{{ review.review }}
			</div>
			<button class="reviews-button" @click="clickHandler">
				{{ isReadMoreClicked ? 'Read Less' : 'Read More' }}
			</button>
		</div>
	</li>
</template>

<script>
import { gsap } from 'gsap'

export default {
	props: ['review'],
	data() {
		return {
			isReadMoreClicked: false,
		}
	},

	methods: {
		clickHandler() {
			this.isReadMoreClicked = !this.isReadMoreClicked
			let review = this.$refs.reviewContent

			this.isReadMoreClicked
				? gsap.to(review, { height: 'auto', duration: 0.5 })
				: gsap.to(review, { height: '70px', duration: 0.5 })
		},
	},
}
</script>
<style lang="sass" scoped>
.reviews__item
	padding-top: 20px
	padding-bottom: 20px
	padding-left: 10px
	padding-right: 10px
	display: flex
	align-items: flex-start

	&:not(:last-child)
		border-bottom: 2px solid #a3a3a3

	&__image
		width: 100%
		max-width: 60px
		margin-right: 10px
		object-fit: contain
		object-position: top

	&__username
		margin-bottom: 10px
		font-weight: 700

	&__review
		height: 70px
		margin-bottom: 10px
		position: relative
		overflow-y: hidden

		&::after
			width: 100%
			height: 100%
			content: ''
			position: absolute
			bottom: 0
			left: 0
			background: linear-gradient(to top, rgba(255,255,255, 1) 20%, rgba(255,255,255, 0) 80%)
			pointer-events: none

.opened
	&::after
		display: none

.reviews-button
	@include button
</style>