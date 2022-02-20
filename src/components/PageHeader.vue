<template>
	<header class="header">
		<div class="header__wrapper">
			<router-link class="header__logo" :to="{ name: 'HomePage' }"
				>AniBase</router-link
			>
			<ul class="header__list">
				<li class="header__item">
					<router-link class="header__link" :to="{ name: 'HomePage' }"
						>Home</router-link
					>
				</li>
			</ul>
		</div>
	</header>
</template>

<script>
export default {}
</script>

<style lang='sass' scoped>
.header
	width: 100%
	padding-top: 20px
	padding-bottom: 20px
	background-color: springgreen

	&__wrapper
		@include container
		display: flex
		align-items: center

	&__logo
		margin-right: 15px
		display: block
		font-family: 'Akaya-Telivigala'
		font-size: 28px
		line-height: .9
		text-decoration: none
		color: #000

	&__list
		padding: 0
		margin-top: 0
		margin-bottom: 0
		display: flex
		list-style-type: none

	&__item
		min-width: 100px
		padding: 8px 8px
		transition: .2s
		text-align: center

		&:hover
			background-color: #fff
			font-weight: 700

	&__link
		display: block
		font-weight: 700
		color: #000
		text-decoration-line: none
</style>