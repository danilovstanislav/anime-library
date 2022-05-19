<template>
	<ul class="tabs">
		<li
			v-if="Object.keys(currentAnime).length"
			@click="activeTab = 'AnimePageMain'"
			class="tabs__item"
			:class="{ active: activeTab === 'AnimePageMain' }"
		>
			Details
		</li>
		<li
			v-if="charactersArray.length"
			@click="activeTab = 'AnimePageCharacters'"
			class="tabs__item"
			:class="{ active: activeTab === 'AnimePageCharacters' }"
		>
			Characters
		</li>
		<li
			v-if="reviewsArray.length"
			@click="activeTab = 'AnimePageReviews'"
			class="tabs__item"
			:class="{ active: activeTab === 'AnimePageReviews' }"
		>
			Reviews
		</li>
	</ul>
	<component
		:is="activeTab"
		:currentAnime="currentAnime"
		:charactersArray="charactersArray"
		:reviewsArray="reviewsArray"
		:recommendationsArray="recommendationsArray"
	/>
</template>

<script>
import AnimePageMain from '@/components/AnimePageMain.vue'
import AnimePageCharacters from '@/components/AnimePageCharacters.vue'
import AnimePageReviews from '@/components/AnimePageReviews.vue'

export default {
	components: {
		AnimePageMain,
		AnimePageCharacters,
		AnimePageReviews,
	},

	props: {
		currentAnime: Object,
		charactersArray: Array,
		reviewsArray: Array,
		recommendationsArray: Array,
	},

	data() {
		return {
			activeTab: 'AnimePageMain',
		}
	},
}
</script>

<style lang="sass" scoped>
.tabs
	width: 100%
	padding-left: 0
	margin-top: 0
	margin-bottom: 10px
	display: flex
	justify-content: center
	list-style: none

	&__item
		width: 100%
		max-width: 120px
		padding-left: 10px
		padding-right: 10px
		padding-top: 8px
		padding-bottom: 8px
		background-color: $main-color
		border-radius: 10px
		text-align: center
		color: $dark-black-color
		cursor: pointer
		transition: all .2s

		&:not(:last-child)
			margin-right: 10px

		&:hover
			opacity: .7
			box-shadow: 0 0 0 2px $dark-black-color

	.active
		background-color: #fffb96
		box-shadow: 0 0 0 2px $light-black-color
		font-family: 'Fredoka-SemiBold', sans-serif
</style>