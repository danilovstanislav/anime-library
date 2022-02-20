<template>
	<router-link
		class="card"
		:to="{ name: 'AnimePage', params: { animeId: animeCard.entry.mal_id } }"
	>
		<img
			class="card__image"
			:src="animeCard.entry.images.jpg.image_url"
			alt="Anime image"
		/>
		<div class="card__info">
			<h4 class="card__episode">{{ animeCard.episodes[0].title }}</h4>
			<div class="card__title">{{ animeCard.entry.title }}</div>
		</div>
	</router-link>
</template>

<script>
export default {
	props: {
		animeCard: Object,
	},
}
</script>

<style lang="sass" scoped>
.card
	padding: 10px
	display: flex
	flex-direction: column
	justify-content: flex-end
	background-color: #fff
	font-family: 'Open Sans'
	border-radius: 5px
	transition: .2s

	@media (max-width: $screen-xs-max)
		padding: 5px

	&:hover
		box-shadow: 4px 4px 15px 2px rgba(34, 60, 80, 0.2)
		opacity: .9

	&__image
		width: 100%
		height: 190px
		display: block
		object-fit: cover

		@media (max-width: $screen-s-max)
			height: 160px

		@media (max-width: $screen-xs-max)
			height: 150px

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

	&__episode
		margin-top: 5px
		margin-bottom: 5px
		color: #3f3f3f
		font-size: 16px

	&__title
		margin-top: 0
		margin-bottom: 0
		color: #3f3f3f
		font-size: 14px
		white-space: nowrap
		text-overflow: ellipsis
		overflow: hidden
</style>