<template>
	<page-header />
	<router-view />
	<ButtonToTop />
	<page-footer />
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import ButtonToTop from '@/components/ButtonToTop.vue'
import PageFooter from '@/components/PageFooter.vue'
export default {
	components: {
		PageHeader,
		PageFooter,
		ButtonToTop,
	},
}
</script>

<style lang="sass">
#app
	min-height: 100vh
	display: flex
	flex-direction: column
	font-family: 'Fredoka-Regular', sans-serif
</style>
