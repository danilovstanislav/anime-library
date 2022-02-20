<template>
	<swiper
		class="slider__container"
		:breakpoints="breakpoints"
		:simulate-touch="true"
		:modules="modules"
		navigation
	>
		<swiper-slide v-for="card in contentArr" :key="card.mal_id">
			<slot :card="card" />
		</swiper-slide>
	</swiper>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue'
import { Navigation } from 'swiper'
import 'swiper/swiper-bundle.min.css'

export default {
	components: {
		Swiper,
		SwiperSlide,
	},
	props: {
		contentArr: Array,
		breakpoints: Object,
	},
	data() {
		return {
			modules: [Navigation],
		}
	},
}
</script>

<style lang="sass" scoped>
.slider__container
	max-width: 1200px
	padding-left: 10px
	padding-right: 10px
</style>