<template>
	<div class="container">
		<h2 class="characters__title">Characters and Voice Actors</h2>
		<div
			class="characters"
			v-for="char in $store.state.animePage.charactersArray"
			:key="char.character.mal_id"
		>
			<div class="characters__hero">
				<img :src="char.character.images.jpg.image_url" alt="Character image" />
				<span class="characters__name"> {{ char.character.name }} </span>
				<span class="characters__role"> {{ char.role }} </span>
			</div>

			<div class="characters__voice-actor">
				<!-- <img :src="char.voice_actors[0].person.images.jpg.image_url" alt="Character image" /> -->
				<span class="characters__voice-actor__name">
					<!-- {{ char.voice_actors[0].person.name }} -->
					<!-- {{ getJapaneseVoiceActor(char) }} -->
					{{ getJapaneseVoiceActor(char).image }}
				</span>
				<span class="characters__voice-actor__lang">
					<!-- {{ char.voice_actors[0].language }} -->
				</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			voiceActors: {},
		}
	},
	methods: {
		getJapaneseVoiceActor(character) {
			return character.voice_actors.forEach((i) => {
				if (i.language === 'Japanese') {
					return {
						image: i.person.images.jpg.image_url,
						name: i.person.name,
						lang: i.language,
					}
				}
			})
		},
	},
}
</script>

<style lang="sass" scoped>
.container
	@include container
</style>