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
		<ul class="sidebar__list">
			<anime-title />
			<transition-group name="sidebar-list" appear>
				<li
					class="sidebar__item"
					v-for="cat in animeInfo.categories"
					:key="cat.key"
				>
					<span class="sidebar__item-category"> {{ cat.key }}: </span>
					{{ cat.value }}
				</li>
			</transition-group>
		</ul>
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
		margin-bottom: 0
		margin-bottom: 0
		list-style: none

		&:deep(.anime-title)
			display: none

			@media (max-width: $screen-xs-max)
				display: block

	&__item:not(:last-child)
		margin-bottom: 5px

	&__item-category
		font-weight: 700

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