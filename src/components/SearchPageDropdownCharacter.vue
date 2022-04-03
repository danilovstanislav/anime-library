<template>
	<TransitionGroup
		@before-enter="onBeforeEnter"
		@enter="onEnter"
		@leave="onLeave"
		appear
	>
		<li
			class="dropdown__item"
			v-for="(search, index) in slicedSearchResult"
			:key="search.mal_id"
			:data-index="index"
		>
			<router-link
				class="dropdown__link"
				:to="{ name: 'AnimePageMain', params: { animeId: search.mal_id } }"
				@click="dropdownClickHandler(search.mal_id)"
			>
				<img
					class="dropdown__item__image"
					:src="search.images.jpg.image_url"
					:alt="searchTitle(search) ?? 'Anime image'"
				/>
				<div class="dropdown__item__info">
					<div class="dropdown__item__title" :title="searchTitle(search)">
						{{ searchTitle(search) }}
					</div>
					<div class="dropdown__item__episodes">
						{{ searchEpisodesAndType(search) }}
					</div>
					<div class="dropdown__item__year">
						{{ cardYear(search) }}
					</div>
				</div>
			</router-link>
		</li>
	</TransitionGroup>
</template>

<script>
export default {
	methods: {
		searchTitle(search) {
			return search.title_english ? search.title_english : search.title
		},

		searchEpisodesAndType(search) {
			const ep = search.episodes
			const epString = ep ? ep + ' ep.' : null
			const type = search.type ?? ''
			return epString ? `${type} | ${epString}` : type
		},

		cardYear(search) {
			const year = search.aired.prop.from.year
			return year ? year : 'Soon'
		},
	},
}
</script>

<style lang="sass" scoped>
</style>