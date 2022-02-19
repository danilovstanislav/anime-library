<template>
	<div class="container">
		<aside class="sidebar">
			<img
				:src="$store.state.animePage.currentAnime?.images.jpg.large_image_url"
				alt="Anime poster"
				class="sidebar-image"
			/>
			<ul class="sidebar__list">
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
		<div class="main-content">
			<h2 class="anime-title">
				{{
					$store.state.animePage.currentAnime?.title_english
						? $store.state.animePage.currentAnime?.title_english
						: $store.state.animePage.currentAnime?.title
				}}
			</h2>
			<section class="about">
				<h4 class="section-title">About</h4>
				{{ getTextAbout(isShowMore) }}
				<button
					class="button about__button"
					@click="isShowMore = !isShowMore"
					v-if="!isShowMore"
				>
					show more
				</button>
				<button
					class="button about__button about__button--less"
					@click="isShowMore = !isShowMore"
					v-else
				>
					show less
				</button>
			</section>

			<section class="trailer">
				<h4 class="section-title">Official trailer</h4>
				<iframe
					class="trailer__video"
					width="330"
					height="200"
					:src="$store.state.animePage.currentAnime?.trailer.embed_url"
					frameborder="0"
					allowfullscreen
				>
				</iframe>
			</section>

			<section class="characters">
				<h4 class="section-title characters__title">
					Characters<button class="button characters__button">view more</button>
				</h4>
				<ul class="characters__list">
					<li
						class="characters__item"
						v-for="char in $store.state.animePage.charactersArray.slice(0, 6)"
						:key="char.mal_id"
					>
						<img
							class="character__image"
							:src="char.character.images.jpg.image_url"
							alt="Character image"
						/>
						<div class="character__info">
							<div class="character__name">{{ char.character.name }}</div>
							<div class="character__role">{{ char.role }}</div>
						</div>
					</li>
				</ul>
			</section>

			<section class="reviews">
				<h4 class="section-title reviews__title">
					Reviews<button class="button reviews__button">view more</button>
				</h4>
				<ul class="reviews__list">
					<li
						class="reviews__item"
						v-for="review in $store.state.animePage.reviewsArray.slice(0, 5)"
						:key="review.mal_id"
					>
						<img
							:src="review.user.images.jpg.image_url"
							alt="User image"
							class="reviews__user-image"
						/>
						<div class="reviews__info">
							<div class="reviews__username">{{ review.user.username }}</div>
							<div class="reviews__date">
								{{ review.date.toLocaleString('ru') }}
							</div>
							<div class="reviews__text">
								{{ `${review.review.substring(0, 250)}...` }}
							</div>
						</div>
					</li>
				</ul>
			</section>

			<section class="recommendations">
				<h4 class="section-title">Recommendations</h4>
				<div class="recommendations__list">
					<slider
						v-slot="{ card }"
						:contentArr="$store.state.animePage.recommendationsArray"
						:breakpoints="breakpoints"
					>
						<router-link
							class="recommendations__item"
							:to="{
								name: 'AnimePage',
								params: { animeId: card.entry.mal_id },
							}"
							@click="getAnimeById(card.entry.mal_id)"
						>
							<img
								class="recommendations__image"
								:src="card.entry.images.jpg.image_url"
								alt="Anime image"
							/>
							<h5 class="recommendations__item-title">
								{{ card.entry.title }}
							</h5>
						</router-link>
					</slider>
				</div>
			</section>
		</div>
	</div>
</template>

<script>
import Slider from '@/components/Slider.vue'
import { mapActions } from 'vuex'
import { smallSlider } from '@/plugins/slider'
export default {
	components: {
		Slider,
	},
	data() {
		return {
			textAbout: '',
			isShowMore: false,
			breakpoints: smallSlider.breakpoints
		}
	},

	created() {
		this.getAnimeById(this.$route.params.animeId)
	},

	methods: {
		...mapActions({
			getAnimeById: 'animePage/getAnimeById',
		}),

		getTextAbout(flag) {
			return flag
				? this.$store.state.animePage.currentAnime?.synopsis
				: `${this.$store.state.animePage.currentAnime?.synopsis.substring(
						0,
						250
				  )}...`
		},
	},
}
</script>

<style lang='sass' scoped>
.container
	@include container
	padding-top: 30px
	padding-bottom: 30px
	display: flex

.sidebar
	width: 25%
	margin-right: 15px

	&-image
		width: 100%
		display: block
		border-radius: 5px

	&__list
		padding: 0
		margin-top: 10px
		margin-bottom: 0
		list-style: none

	&__item-category
		font-weight: 700

.main-content
	max-width: calc(75% - 20px)
	display: flex
	flex-direction: column

.anime-title
	margin-top: 0
	margin-bottom: 25px
	font-size: 24px
	font-weight: 800

.section-title
	@include borderBottom
	padding-bottom: 2px
	margin: 0
	font-weight: 700

.button
	padding: 0
	background-color: transparent
	border: none
	font-family: inherit
	font-size: 14px
	font-weight: 700
	cursor: pointer
	color: springgreen

.about
	margin-bottom: 50px

	&__button
		margin-left: 5px

		&--less
			margin-left: 0
			margin-top: 5px
			display: block

.trailer
	margin-bottom: 50px

	&__video
		margin-top: 15px

.characters
	margin-bottom: 50px

	&__title
		display: flex
		justify-content: space-between

	&__list
		padding: 0
		margin-top: 10px
		margin-bottom: 0
		display: grid
		grid-template-columns: 1fr 1fr
		grid-gap: 5px
		list-style: none

	&__item
		padding: 5px
		display: flex
		border: 1px solid #a8a8a8
		border-radius: 5px

	.character__info
		display: inline-block

	.character__image
		max-width: 60px
		margin-right: 10px
		display: inline-block

	.character__name
		margin-bottom: 5px
		font-weight: 700

.reviews
	margin-bottom: 50px

	&__title
		display: flex
		justify-content: space-between

	&__list
		padding: 0
		margin-top: 10px
		margin-bottom: 0
		list-style: none

	&__item
		padding: 10px
		display: flex
		align-items: flex-start
		border: 1px solid #a8a8a8
		border-radius: 5px

		&:not(:last-child)
			margin-bottom: 10px

	&__user-image
		max-width: 60px
		margin-right: 10px
		display: inline-block

	&__username
		margin-bottom: 5px
		font-weight: 700

	&__date
		margin-bottom: 5px
		font-size: 14px

.recommendations
	width: 100%

	&__list
		max-width: 100%
		padding: 0
		margin-top: 0
		margin-bottom: 0
		list-style: none

	&:deep(.slider__container)
		max-width: 100%
		padding: 0
		margin-top: 15px

	&__item
		display: block
		color: #000
		text-decoration: none

	&__image
		width: 100%
		height: 160px
		margin-bottom: 5px
		display: block
		object-fit: cover
		object-position: center

		@media (max-width: $screen-xs-max)
			height: 120px

	&__item-title
		margin: 0
		font-size: 13px
		white-space: nowrap
		text-overflow: ellipsis
		overflow: hidden
</style>