<template>
	<router-link
		class="card"
		:to="{ name: 'CharacterInfoPage', params: { charId: charCard.mal_id } }"
	>
		<img
			class="card__image"
			:src="charCard.images.jpg.image_url"
			:alt="cardTitle ?? 'Anime poster'"
		/>
		<div class="card__title" :title="cardTitle">
			{{ cardFavorite }}
		</div>
		<div class="card__favorites">
			{{ cardFavorites }}
		</div>
	</router-link>
</template>

<script>
export default {
	props: {
		charCard: Object,
	},
	computed: {
		cardTitle() {
			return this.charCard.name
		},

		cardFavorites() {
			return `In the favorites of ${this.charCard.favorites} people`
		},
	},
}
</script>

<style lang="sass" scoped>
.slider__wrapper
	@include container
	padding-left: 10px
	padding-right: 10px

.card
	width: 100%
	display: flex
	flex-direction: column
	background-color: #fff
	border-radius: 10px
	overflow: hidden
	text-decoration: none
	transition: all .2s ease

	&:hover
		opacity: .85
		box-shadow: -12px 0 20px -12px rgba(0, 0, 0, 0.35), 12px 0 20px -12px rgba(0, 0, 0, 0.35)

	&__image
		display: block
		object-fit: cover
		object-position: center center

	&__info
		padding-left: 10px
		padding-right: 10px
		padding-bottom: 10px
		margin-top: 7px

		@media (max-width: $screen-s-max)
			font-size: 14px

		&__item
			color: lighten($dark-black-color, 25%)

			&:not(:last-child)
				margin-bottom: 5px

	&__title
		color: $dark-black-color
		font-weight: 700
		white-space: nowrap
		text-overflow: ellipsis
		overflow: hidden
</style>