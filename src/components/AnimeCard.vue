<template>
	<router-link
		class="card"
		:to="{ name: 'AnimePage', params: { animeId: animeCard.mal_id } }"
	>
		<div class="card__image-wrapper">
			<img
				class="card__image"
				:src="animeCard.images.jpg.image_url"
				alt="Anime poster"
			/>
		</div>
		<div class="card__info">
			<h4 class="card__title">
				{{ cardTitle }}
			</h4>
			<div class="card__episodes">
				{{ cardEpisodes }}
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
		cardEpisodes() {
			const ep = this.animeCard.episodes
			return `${ep ? ep : ''} ${ep > 0 ? 'ep.' : 'Soon'}`
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
	padding: 10px
	display: flex
	flex-direction: column
	justify-content: flex-end
	background-color: #fff
	transition: .2s
	text-decoration: none
	transition: all .2s ease

	@media (max-width: $screen-xs-max)
		padding: 5px

	&:hover
		box-shadow: 4px 4px 15px 2px rgba(34, 60, 80, 0.2)
		opacity: .9

	&__image-wrapper
		width: 100%
		overflow: hidden

	&__image
		width: 100%
		height: 190px
		display: block
		object-fit: cover
		object-position: center

		@media (max-width: $screen-s-max)
			height: 160px

		@media (max-width: $screen-xs-max)
			height: 250px

	&__info
		margin-top: 7px

	&__title
		margin-top: 0
		margin-bottom: 5px
		color: #3f3f3f
		font-size: 16px
		white-space: nowrap
		text-overflow: ellipsis
		overflow: hidden

		@media (max-width: $screen-m-max)
			font-size: 15px

		@media (max-width: $screen-xs-max)
			font-size: 11px

	&__episodes
		color: #808080
		font-size: 15px

		@media (max-width: $screen-m-max)
			font-size: 14px

		@media (max-width: $screen-xs-max)
			font-size: 11px
</style>