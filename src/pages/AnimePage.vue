<template>
	<section class="anime-page">
		<div class="container" v-if="Object.keys(this.currentAnime).length">
			<AnimePageSidebar :animeInfo="animeInfo" :trailer="trailer" />
			<div class="main">
				<AnimeTitle :animeTitle="animeTitle" />
				<AnimePageTabs
					:currentAnime="currentAnime"
					:charactersArray="charactersArray"
					:reviewsArray="reviewsArray"
					:recommendationsArray="recommendationsArray"
				/>
			</div>
		</div>
		<LoadingPage v-else />
	</section>
</template>

<script>
import AnimePageSidebar from '@/components/AnimePageSidebar.vue'
import AnimeTitle from '@/components/AnimeTitle.vue'
import AnimePageTabs from '@/components/AnimePageTabs.vue'
import LoadingPage from '@/components/LoadingPage.vue'
import instance from '@/plugins/axios/axios'

export default {
	components: {
		AnimePageSidebar,
		AnimeTitle,
		AnimePageTabs,
		LoadingPage,
	},

	data() {
		return {
			currentAnime: {},
			animeInfo: {
				animeImage: null,
				animeImageAlt: null,
				categories: [],
			},
			trailer: {},
			charactersArray: [],
			reviewsArray: [],
			recommendationsArray: [],
		}
	},

	mounted() {
		this.getAnimeById(this.currentId)
	},

	unmounted() {
		this.removeAllData()
	},

	computed: {
		currentId() {
			return this.$route.params.animeId
		},

		animeTitle() {
			return this.currentAnime.title_english
				? this.currentAnime.title_english
				: this.currentAnime.title
		},
	},

	methods: {
		async getAnimeById(id) {
			try {
				const res = await instance.get(`anime/${id}`)
				this.currentAnime = res.data.data
				this.animeInfo = {
					animeImage: this.currentAnime.images.jpg.large_image_url,
					animeImageAlt: this.currentAnime.title,
					categories: [
						{ key: 'Type', value: this.currentAnime.type },
						{ key: 'Episodes', value: this.currentAnime.episodes },
						{ key: 'Status', value: this.currentAnime.status },
						{ key: 'Premiered', value: this.currentAnime.aired.string },
						{
							key: 'Genres',
							value: this.currentAnime.genres
								.map((i) => i.name)
								.slice(0, 3)
								.join(' '),
						},
						{ key: 'Duration', value: this.currentAnime.duration },
					],
				}
				this.animeTrailer = this.currentAnime.trailer.url
				this.getCharacters(id)
				this.getReviews(id)
				this.getRecommendations(id)
			} catch (err) {
				console.error(err)
			}
		},

		async getCharacters(id) {
			try {
				const res = await instance.get(`anime/${id}/characters`)
				this.charactersArray = res.data.data
			} catch (err) {
				this.charactersArray = []
				console.error(err)
			}
		},

		async getReviews(id) {
			try {
				const res = await instance.get(`anime/${id}/reviews`)
				this.reviewsArray = res.data.data
			} catch (err) {
				this.reviewsArray = []
				console.error(err)
			}
		},

		async getRecommendations(id) {
			try {
				const res = await instance.get(`anime/${id}/recommendations`)
				this.recommendationsArray = res.data.data
			} catch (err) {
				this.recommendationsArray = []
				console.error(err)
			}
		},

		removeAllData() {
			this.currentAnime = {}
			this.animeInfo = {
				animeImage: null,
				animeImageAlt: null,
				categories: [],
			}
			this.trailer = {}
			this.charactersArray = []
			this.reviewsArray = []
			this.recommendationsArray = []
		},
	},

	watch: {
		currentId(val) {
			if (val >= 0) {
				this.removeAllData()
				this.getAnimeById(val)
			}
		},
	},
}
</script>

<style lang='sass' scoped>
.anime-page
	@include sectionWrapper

.container
	@include container
	padding-top: 30px
	padding-bottom: 30px
	display: flex
	position: relative
	overflow: hidden

	@media (max-width: $screen-xs-max)
		flex-direction: column
		font-size: 14px

.main
	width: 100%
	max-width: calc(75% - 20px)
	display: flex
	flex-direction: column

	@media (max-width: $screen-xs-max)
		max-width: 100%
</style>