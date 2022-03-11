<template>
	<router-link
		class="card"
		:to="{ name: 'AnimePageMain', params: { animeId: animeCard.mal_id } }"
	>
		<img
			v-show="Object.keys(animeCard).length"
			class="card__image"
			:src="animeCard.images.jpg.image_url"
			:alt="cardTitle ?? 'Anime poster'"
		/>
		<div class="card__info">
			<div class="card__info__item card__title">
				{{ cardTitle }}
			</div>
			<div class="card__info__item">
				{{ cardEpisodesAndType }}
			</div>
			<div class="card__info__item">
				{{ cardYear }}
			</div>
		</div>
	</router-link>
</template>

<script>
export default {
	props: {
		animeCard: Object,
	},
	computed: {
		cardTitle() {
			return this.animeCard.title_english
				? this.animeCard.title_english
				: this.animeCard.title
		},

		cardEpisodesAndType() {
			const ep = this.animeCard.episodes
			const epString = ep ? ep + ' ep.' : null
			const type = this.animeCard.type ?? ''
			return epString ? `${epString} | ${type}` : type
		},

		cardYear() {
			const year = this.animeCard.aired.prop.from.year
			return year ? year : 'Soon'
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