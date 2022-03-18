<template>
	<div class="character">
		<div class="character__image loading" />
		<div class="character__wrapper">
			<div class="character__name loading" />
			<div class="character__description">
				<div class="character__description__item loading" />
				<div class="character__description__item loading" />
				<div class="character__description__item loading" />
				<div class="character__description__item loading" />
			</div>
		</div>
	</div>
</template>

<style lang="sass" scoped>
.character
	@include container
	padding-top: 30px
	padding-bottom: 30px
	display: flex
	align-items: flex-start
	justify-content: flex-start

	@media(max-width: $screen-xs-max)
		flex-direction: column
		align-items: center

	&__wrapper
		width: 100%

	&__image
		width: 80%
		max-width: 300px
		height: 350px
		margin-right: 15px

		@media(max-width: $screen-xs-max)
			margin-bottom: 20px
			margin-right: 0

	&__name
		width: 50%
		height: 25px
		margin-bottom: 15px
		margin-right: auto
		border-radius: 10px

	&__description
		width: 100%

		&__item
			width: 100%
			height: 25px
			margin-bottom: 5px
			border-radius: 10px

.loading
	background-color: darken($bc-grey-color, 5%)
	animation: pulse 1s linear infinite alternate

@keyframes pulse
	0%
		// background-color: hsl(200, 20%, 70%)
		opacity: 0.3
	100%
		// background-color: hsl(200, 20%, 95%)
		opacity: 1
</style>