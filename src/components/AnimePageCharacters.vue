<template>
	<section class="characters" v-if="charactersArray">
		<h2 class="characters__title">Characters</h2>
		<div class="characters__filter">
			<label for="filter" class="filter__label">Search by name:</label>
			<input
				v-model="filterInp"
				type="text"
				class="filter__input"
				name="filter"
				placeholder="Search of character"
			/>
		</div>
		<ul
			v-if="filteredCharactersArray.length"
			ref="charList"
			class="characters__list"
		>
			<TransitionGroup @before-enter="onBeforeEnter" @enter="onEnter" appear>
				<CharactersListItem
					v-for="(char, index) in filteredCharactersArray"
					:key="char.character.mal_id"
					:data-index="index"
					:char="char"
				/>
			</TransitionGroup>
		</ul>
		<div class="empty-search" v-else>Sorry, can not find the character 😥</div>
	</section>
</template>

<script>
import CharactersListItem from '@/components/CharactersListItem.vue'
import { gsap } from 'gsap'

export default {
	components: {
		CharactersListItem,
	},

	props: {
		charactersArray: Array,
	},

	data() {
		return {
			filterInp: '',
			page: 1,
			hasNextPage: false,
			showCardsNumber: 10,
		}
	},

	mounted() {
		window.addEventListener('scroll', this.scrollHandler)
	},

	unmounted() {
		window.removeEventListener('scroll', this.scrollHandler)
	},

	computed: {
		filteredCharactersArray() {
			const end = this.page * this.showCardsNumber

			const filteredArr = this.charactersArray.filter((char) => {
				const charName = char.character.name.toLowerCase()
				const input = this.filterInp.toLowerCase()
				return charName.includes(input)
			})

			this.hasNextPage = filteredArr.length > end

			return filteredArr.slice(0, end)
		},
	},

	methods: {
		scrollHandler() {
			const el = this.$refs.charList
			if (el) {
				if (
					el.getBoundingClientRect().bottom <= window.innerHeight &&
					this.hasNextPage
				) {
					this.page += 1
				}
			} else return
		},

		onBeforeEnter(el) {
			el.style.opacity = 0
			el.style.transform = 'translateX(35%)'
		},

		onEnter(el, done) {
			gsap.to(el, {
				opacity: 1,
				transform: 'translateX(0)',
				delay: el.dataset.index * 0.03,
				onComplete: done,
			})
		},
	},
}
</script>

<style lang="sass" scoped>
.characters
	width: 100%
	height: 100%
	min-height: 50vh
	position: relative

.characters__title
	margin-top: 0
	margin-bottom: 10px

.characters__filter
	margin-bottom: 10px
	display: flex
	align-items: center
	justify-content: center

	.filter__label
		margin-right: 10px
		font-weight: 700

	.filter__input
		width: 100%
		max-width: 250px
		padding: 4px 8px
		font-size: 18px

		&:focus
			outline: none

.characters__list
	width: 100%
	padding-left: 0
	margin-top: 0
	margin-bottom: 0
	display: flex
	flex-direction: column
	list-style: none

.empty-search
	position: absolute
	top: 50%
	left: 50%
	transform: translate(-50%, -50%)
	text-align: center
	font-size: 24px
	font-family: 'Fredoka-Bold', sans-serif
</style>