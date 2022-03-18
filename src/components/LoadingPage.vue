<template>
	<div class="loading">
		<h2 class="loading__title">Loading</h2>
		<LoadingCircle />
	</div>
</template>

<script>
import LoadingCircle from '@/components/LoadingCircle.vue'
export default {
	components: {
		LoadingCircle,
	},
}
</script>
<style lang="sass" scoped>
.loading
	@include container
	display: flex
	align-items: center
	justify-content: center
	position: absolute
	top: 50%
	left: 50%
	transform: translate(-50%, -50%)

	&__title
		margin-bottom: 0
		margin-top: 0
		margin-right: 10px
		font-size: 32px
		font-family: 'Fredoka-Semibold', sans-serif
		line-height: 0.8
		animation: pulse 1s linear infinite alternate

	&:deep(.loader)
		width: 40px
		height: 40px

@keyframes pulse
	0%
		opacity: .5
	100%
		opacity: 1
</style>