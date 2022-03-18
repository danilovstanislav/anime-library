<template>
	<div class="page__body">
		<page-header />
		<div class="page__content">
			<router-view />
		</div>
		<page-footer />
	</div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import PageFooter from '@/components/PageFooter.vue'
export default {
	components: {
		PageHeader,
		PageFooter,
	},
}
</script>

<style lang="sass" scoped>
.page__body
	min-width: 100%
	min-height: 100vh
	display: flex
	flex-direction: column
	position: relative

.page__content
	min-height: 70vh
	flex-grow: 1
</style>
