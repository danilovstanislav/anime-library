<template>
	<li class="character">
		<img
			class="character-image"
			:src="char.character.images.jpg.image_url"
			alt="Character image"
		/>
		<div class="character__info">
			<router-link
				class="character__name"
				:to="{
					name: 'CharacterPage',
					params: { charId: char.character.mal_id },
				}"
			>
				{{ char.character.name }}
			</router-link>
			<div class="character__role">{{ char.role }}</div>
		</div>
	</li>
</template>

<script>
export default {
	props: ['char'],
}
</script>

<style lang="sass" scoped>
.character
	width: 100%
	max-height: 125px
	padding-top: 5px
	padding-bottom: 5px
	padding-left: 5px
	display: flex
	border-radius: 5px

	&-image
		width: 100%
		max-width: 75px
		margin-right: 10px
		display: block
		object-fit: cover
		object-position: center
		border-radius: 5px

	&__name
		margin-bottom: 10px
		text-decoration: none
		color: #000
		font-weight: 700

		&:hover
			color: $main-color
			text-decoration: underline

	&:nth-child(even)
		background-color: #ebebeb
</style>