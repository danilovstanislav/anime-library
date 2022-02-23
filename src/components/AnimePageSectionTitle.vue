<template>
	<div class="title__wrapper">
		<h4 class="section-title">
			<slot></slot>
		</h4>
		<router-link
			class="button-view-more"
			v-if="routerPath && viewMoreButton"
			:to="routerPath"
		>
			view more
		</router-link>
	</div>
</template>

<script>
export default {
	props: ['routerPath', 'viewMoreButton'],
}
</script>

<style lang="sass" scoped>
.title__wrapper
	@include borderBottom
	width: 100%
	padding-bottom: 2px
	display: flex
	justify-content: space-between

.section-title
	margin: 0
	font-weight: 700

.button-view-more
	display: block
	color: $main-color
	text-decoration: none
	font-weight: 700
	font-size: 14px
	font-family: inherit

	&:hover
		text-decoration: underline
</style>