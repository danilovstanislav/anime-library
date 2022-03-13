<template>
	<header class="header">
		<div class="header__wrapper">
			<router-link
				class="header__logo"
				:to="{ name: 'HomePage' }"
				@click="clickHandler"
				>AniBase</router-link
			>
			<ul class="header__list">
				<li class="header__item">
					<router-link
						class="header__link"
						:to="{ name: 'SearchPage' }"
						@click="clickHandler"
						>Search</router-link
					>
				</li>
			</ul>
			<SearchInput />
		</div>
	</header>
</template>

<script>
import SearchInput from '@/components/SearchInput.vue'
export default {
	components: {
		SearchInput,
	},

	methods: {
		clickHandler() {
			const scrollToTop = () => {
				if (window.pageYOffset === 0) {
					window.removeEventListener('scroll', scrollToTop)
				}
			}
			window.addEventListener('scroll', scrollToTop)
			window.scroll({ top: 0, behavior: 'smooth' })
		},
	},
}
</script>

<style lang='sass' scoped>
.header
	width: 100%
	padding-top: 20px
	padding-bottom: 20px
	position: sticky
	top: 0
	z-index: 100
	background-color: $main-color

	&__wrapper
		@include container
		display: flex
		align-items: center

	&__logo
		margin-right: 15px
		display: block
		font-family: 'Fredoka-SemiBold'
		font-size: 28px
		line-height: .9
		text-decoration: none
		color: $dark-black-color

	&__list
		padding: 0
		margin-top: 0
		margin-bottom: 0
		display: flex
		list-style-type: none

	&__item
		min-width: 90px
		transition: .2s
		text-align: center

	&__link
		@include button
		display: block
		text-decoration-line: none
		color: #fff
		text-transform: uppercase

		&:hover
			border-color: #393939

	&:deep(.search__input-wrapper)
		max-width: 300px
		height: 30px
		margin-bottom: 0
		margin-left: auto

		.search__input-icon
			width: 15px
			height: 15px

</style>