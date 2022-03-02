<template>
	<aside class="sidebar">
		<transition name="sidebar-image" appear>
			<img
				class="sidebar-image"
				v-show="animeInfo.animeImage"
				:src="animeInfo.animeImage"
				:alt="animeInfo.animeImageAlt || 'Anime image'"
			/>
		</transition>
		<div class="sidebar__wrapper">
			<anime-title />
			<transition-group
				class="sidebar__list"
				name="sidebar-list"
				appear
				tag="ul"
			>
				<li
					class="sidebar__item"
					v-for="cat in animeInfo.categories"
					:key="cat.key"
				>
					<span class="sidebar__item-category"> {{ cat.key }}: </span>
					{{ cat.value }}
				</li>
			</transition-group>
			<a class="sidebar__trailer-link" :href="trailer.url" target="_blank">
				Watch Trailer
				<svg
					class="sidebar__trailer-link__icon"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
				>
					<path
						d="M188.3 147.1C195.8 142.8 205.1 142.1 212.5 147.5L356.5 235.5C363.6 239.9 368 247.6 368 256C368 264.4 363.6 272.1 356.5 276.5L212.5 364.5C205.1 369 195.8 369.2 188.3 364.9C180.7 360.7 176 352.7 176 344V167.1C176 159.3 180.7 151.3 188.3 147.1V147.1zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"
					/>
				</svg>
			</a>
		</div>
	</aside>
</template>

<script>
import AnimeTitle from '@/components/AnimeTitle.vue'
import { mapState } from 'vuex'

export default {
	components: {
		AnimeTitle,
	},

	computed: {
		...mapState({
			animeInfo: (state) => state.animePage.animeInfo,
			trailer: (state) => state.animePage.trailer,
		}),
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
		object-fit: cover
		object-position: center

		@media (max-width: $screen-xs-max)
			max-width: 45%
			margin-bottom: 0
			margin-right: 10px

	&__list
		padding: 0
		margin-top: 0
		margin-bottom: 10px
		list-style: none

	&:deep(.anime-title)
		display: none

		@media (max-width: $screen-xs-max)
			display: block

	&__item:not(:last-child)
		margin-bottom: 5px

	&__item-category
		font-weight: 700

	&__trailer-link
		@include button
		display: flex
		align-items: center
		justify-content: center
		background-color: $main-color
		color: #000
		text-decoration: none
		text-align: center

		&:hover &__icon
			fill: #393939

		&__icon
			width: 20px
			height: 20px
			margin-left: 7px
			transition: all .3s ease

.sidebar-image-enter-active,
.sidebar-list-enter-active
	transition: all .4s ease

.sidebar-image-enter-from
	opacity: 0
	transform: translateX(-30%)

.sidebar-image-enter-to
	opacity: 1
	transform: translateX(0)

.sidebar-list-enter-from
	opacity: 0
	transform: scale(0.6)

.sidebar-list-enter-to
	opacity: 1
	transform: scale(1)
</style>