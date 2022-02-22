<template>
	<li class="character">
		<img class="character-image" :src="image" alt="Character image" />
		<div class="character__info">
			<div class="character__name">
				{{ name }}
			</div>
			<div class="character__role">{{ role }}</div>
		</div>
	</li>
</template>

<script>
export default {
	props: ['name', 'role', 'image'],
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
		font-weight: 700
		margin-bottom: 10px

	&:nth-child(even)
		background-color: #ebebeb
</style>