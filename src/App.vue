<template>
	<div class="page__body">
		<page-header />
		<router-view class="page__content" />
		<button-to-top />
		<page-footer />
	</div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import PageFooter from '@/components/PageFooter.vue'
import ButtonToTop from '@/components/ButtonToTop.vue'
export default {
	components: {
		PageHeader,
		PageFooter,
		ButtonToTop,
	},
}
</script>

<style lang="sass" scoped>
.page__body
	height: 100%
	display: flex
	flex-direction: column
	position: relative

.page__content
	flex-grow: 1
</style>
