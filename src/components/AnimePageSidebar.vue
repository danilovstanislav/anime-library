<template>
	<aside class="sidebar">
		<img
			:src="$store.state.animePage.currentAnime?.images.jpg.large_image_url"
			alt="Anime poster"
			class="sidebar-image"
		/>
		<ul class="sidebar__list">
			<li class="sidebar__item">
				<h2 class="anime-title hidden">
					{{
						$store.state.animePage.currentAnime?.title_english
							? $store.state.animePage.currentAnime?.title_english
							: $store.state.animePage.currentAnime?.title
					}}
				</h2>
			</li>
			<li class="sidebar__item">
				<span class="sidebar__item-category">Type:</span>
				{{ $store.state.animePage.currentAnime?.type }}
			</li>
			<li class="sidebar__item">
				<span class="sidebar__item-category">Episodes:</span>
				{{ $store.state.animePage.currentAnime?.episodes }}
			</li>
			<li class="sidebar__item">
				<span class="sidebar__item-category">Status:</span>
				{{ $store.state.animePage.currentAnime?.status }}
			</li>
			<li class="sidebar__item">
				<span class="sidebar__item-category">Premiered:</span>
				{{ $store.state.animePage.currentAnime?.aired.string }}
			</li>
			<li class="sidebar__item">
				<span class="sidebar__item-category">Genres:</span>
				{{
					`${$store.state.animePage.currentAnime?.genres[0].name}, ${$store.state.animePage.currentAnime?.genres[1]?.name}`
				}}
			</li>
			<li class="sidebar__item">
				<span class="sidebar__item-category">Duration:</span>
				{{ $store.state.animePage.currentAnime?.duration }}
			</li>
		</ul>
	</aside>
</template>

<script>
export default {}
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

	&-image
		width: 100%
		margin-bottom: 10px
		display: block
		border-radius: 5px
		object-fit: cover
		object-position: center

		@media (max-width: $screen-xs-max)
			max-width: 40%
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