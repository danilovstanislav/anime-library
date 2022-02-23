<template>
	<aside class="sidebar">
		<img
			:src="$store.state.animePage.currentAnime.images.jpg.large_image_url"
			alt="Anime poster"
			class="sidebar-image"
		/>
		<ul class="sidebar__list">
			<anime-page-title class="hidden" />
			<li class="sidebar__item" v-for="i in sidebarItems" :key="i.index">
				<span class="sidebar__item-category">
					{{ i.key }}
				</span>
				{{ i.value }}
			</li>
		</ul>
	</aside>
</template>

<script>
import AnimePageTitle from '@/components/AnimePageTitle.vue'

export default {
	components: {
		AnimePageTitle,
	},
	data() {
		return {
			sidebarItems: [
				{ key: 'Type', value: this.$store.state.animePage.currentAnime.type },
				{
					key: 'Episodes',
					value: this.$store.state.animePage.currentAnime.episodes,
				},
				{
					key: 'Status',
					value: this.$store.state.animePage.currentAnime.status,
				},
				{
					key: 'Premiered',
					value: this.$store.state.animePage.currentAnime.aired.string,
				},
				{
					key: 'Genres',
					value: `${this.$store.state.animePage.currentAnime.genres[0].name}, ${this.$store.state.animePage.currentAnime.genres[1]?.name}`,
				},
				{
					key: 'Duration',
					value: this.$store.state.animePage.currentAnime.duration,
				},
			],
		}
	},
}
</script>

<style lang="sass" scoped>
.sidebar
	width: 25%
	margin-right: 15px
	display: flex
	flex-direction: column

	@media (max-width: $screen-xs-max)
		width: 100%
		margin-bottom: 15px
		flex-direction: row
		justify-content: center

	&-image
		width: 100%
		margin-bottom: 10px
		display: block
		border-radius: 5px
		object-fit: cover
		object-position: center

		@media (max-width: $screen-xs-max)
			max-width: 45%
			margin-bottom: 0
			margin-right: 10px

	&__list
		padding: 0
		margin-top: 0
		margin-bottom: 0
		margin-bottom: 0
		list-style: none

		.anime-title
			margin-top: 0
			margin-bottom: 10px

	.hidden
		display: none

		@media (max-width: $screen-xs-max)
			display: block

	&__item-category
		font-weight: 700
</style>