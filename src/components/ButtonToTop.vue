<template>
	<transition name="button-to-top" appear>
		<button
			class="button-scroll-to-top"
			v-show="isButtonActive"
			@click="scrollToTop"
		>
			<svg
				class="button-scroll-to-top__icon"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 384 512"
			>
				<path
					d="M374.6 246.6C368.4 252.9 360.2 256 352 256s-16.38-3.125-22.62-9.375L224 141.3V448c0 17.69-14.33 31.1-31.1 31.1S160 465.7 160 448V141.3L54.63 246.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160C387.1 213.9 387.1 234.1 374.6 246.6z"
				/>
			</svg>
		</button>
	</transition>
</template>

<script>
export default {
	data() {
		return {
			isButtonActive: false,
			offsetY: 0,
		}
	},

	mounted() {
		window.addEventListener('scroll', this.changeOffset)
	},

	unmounted() {
		window.removeEventListener('scroll', this.changeOffset)
	},

	methods: {
		changeOffset() {
			this.offsetY = window.pageYOffset
		},

		scrollToTop() {
			window.scrollTo({ top: 0, behavior: 'smooth' })
		},
	},

	watch: {
		offsetY(v) {
			v > document.documentElement.clientWidth
				? (this.isButtonActive = true)
				: (this.isButtonActive = false)
		},
	},
}
</script>

<style lang="sass">
.button-scroll-to-top
	@include button
	width: 50px
	height: 50px
	padding: 0
	display: flex
	align-items: center
	justify-content: center
	position: fixed
	bottom: 5%
	left: 5%
	border: 3px solid $light-black-color
	font-size: 22px
	z-index: 10

	@media(max-width: $screen-s-max)
		display: none

	&:hover
		border: 3px solid $light-black-color
		background-color: $main-color

		.button-scroll-to-top__icon
			fill: $light-black-color

	&__icon
		width: 25px
		height: 25px
		fill: #fff

.button-to-top-enter-from,
.button-to-top-leave-to
	opacity: 0
	transform: translateX(-10px)

.button-to-top-enter-to,
.button-to-top-leave-from
	opacity: 1
	transform: translateX(0)

.button-to-top-enter-active,
.button-to-top-leave-active
	transition: all .4s ease
</style>