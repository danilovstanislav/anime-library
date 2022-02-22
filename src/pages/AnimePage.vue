<template>
	<div class="container">
		<anime-page-sidebar />
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
					v-if="!isShowMore && getTextAbout().length > 250"
				>
					show more
				</button>
				<button
					class="button about__button about__button--less"
					@click="isShowMore = !isShowMore"
					v-else-if="getTextAbout().length > 250"
				>
					show less
				</button>
			</section>

			<section
				class="trailer"
				v-if="$store.state.animePage.currentAnime.trailer.embed_url"
			>
				<h4 class="section-title">Official trailer</h4>
				<iframe
					class="trailer__video"
					:src="$store.state.animePage.currentAnime.trailer.embed_url"
					frameborder="0"
					allowfullscreen
				>
				</iframe>
			</section>

			<section
				class="characters"
				v-if="$store.state.animePage.charactersArray.length"
			>
				<h4 class="section-title characters__title">
					Characters<router-link
						class="button characters__button"
						v-if="$store.state.animePage.charactersArray.length > 6"
						:to="{
							name: 'CharactersList',
							props: { animeId: $store.state.animePage.currentAnime.mal_id },
						}"
					>
						view more
					</router-link>
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

			<section
				class="reviews"
				v-if="$store.state.animePage.reviewsArray.length"
			>
				<h4 class="section-title reviews__title">
					Reviews<button
						class="button reviews__button"
						v-if="$store.state.animePage.reviewsArray.length > 4"
					>
						view more
					</button>
				</h4>
				<ul class="reviews__list">
					<li
						class="reviews__item"
						v-for="review in $store.state.animePage.reviewsArray.slice(0, 4)"
						:key="review.mal_id"
					>
						<img
							:src="review.user.images.jpg.image_url"
							alt="User image"
							class="reviews__user-image"
						/>
						<div class="reviews__info">
							<div class="reviews__date">
								{{ review.date }}
							</div>
							<div class="reviews__username">{{ review.user.username }}</div>
							<div class="reviews__text">
								{{ `${review.review.substring(0, 250)}...` }}
							</div>
						</div>
					</li>
				</ul>
			</section>

			<section
				class="recommendations"
				v-if="$store.state.animePage.recommendationsArray.length"
			>
				<h4 class="section-title">Recommendations</h4>
				<div class="recommendations__list">
					<slider
						v-slot="{ card }"
						:contentArr="$store.state.animePage.recommendationsArray"
						sliderSize="smallSlider"
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
import AnimePageSidebar from '@/components/AnimePageSidebar.vue'
import { mapActions } from 'vuex'

export default {
	components: {
		Slider,
		AnimePageSidebar,
	},

	data() {
		return {
			textAbout: '',
			isShowMore: false,
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
			const text = this.$store.state.animePage.currentAnime.synopsis
			if (text.length > 250) {
				return flag ? text : `${text.substring(0, 250)}...`
			} else {
				return text
			}
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

	@media (max-width: $screen-xs-max)
		flex-direction: column
		font-size: 14px

.main-content
	width: 100%
	max-width: calc(75% - 20px)
	display: flex
	flex-direction: column

	@media (max-width: $screen-xs-max)
		max-width: 100%

.anime-title
	margin-top: 0
	margin-bottom: 25px
	font-size: 24px
	font-weight: 800

	@media (max-width: $screen-xs-max)
		display: none

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
	margin-bottom: 30px

	@media (max-width: $screen-xs-max)
		margin-bottom: 15px

	&__button
		margin-left: 5px

		&--less
			margin-left: 0
			margin-top: 5px
			display: block

.trailer
	margin-bottom: 50px

	@media (max-width: $screen-xs-max)
		margin-bottom: 25px

	&__video
		max-width: 330px
		width: 100%
		height: 200px
		margin-left: auto
		margin-right: auto
		margin-top: 15px
		display: block

.characters
	margin-bottom: 50px

	@media (max-width: $screen-xs-max)
		margin-bottom: 25px

	&__title
		display: flex
		justify-content: space-between

	&__list
		padding: 0
		margin-top: 10px
		margin-bottom: 0
		display: grid
		justify-items: center
		grid-template-columns: 1fr 1fr
		grid-gap: 10px
		list-style: none

		@media (max-width: $screen-xs-max)
			grid-template-columns: 1fr

	&__item
		max-width: 400px
		width: 100%
		padding: 5px
		display: flex
		border: 1px solid #a8a8a8
		border-radius: 5px

	.character__info
		display: inline-block

	.character__image
		max-width: 60px
		margin-right: 10px
		display: block
		border-radius: 5px

	.character__name
		margin-bottom: 5px
		font-weight: 700

	&__button
		text-decoration: none

		&:hover
			text-decoration: underline

.reviews
	margin-bottom: 50px

	@media (max-width: $screen-xs-max)
		margin-bottom: 25px

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
		display: block
		border-radius: 5px

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
		transition: .2s

		&:hover
			opacity: .85

	&__image
		width: 100%
		height: 160px
		margin-bottom: 5px
		display: block
		object-fit: cover
		object-position: center
		border-radius: 5px

		@media (max-width: $screen-xs-max)
			height: 130px

	&__item-title
		margin: 0
		font-size: 13px
		white-space: nowrap
		text-overflow: ellipsis
		overflow: hidden
</style>