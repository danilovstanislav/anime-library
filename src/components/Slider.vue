<template>
	<swiper
		class="slider__container"
		:breakpoints="getSliderSize"
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
import { wideSlider, smallSlider } from '@/plugins/slider'

export default {
	components: {
		Swiper,
		SwiperSlide,
	},
	props: {
		contentArr: Array,
	},
	data() {
		return {
			modules: [Navigation],
		}
	},
	computed: {
		getSliderSize() {
			const size = this.$attrs.sliderSize

			if (size === 'wideSlider') {
				return wideSlider.breakpoints
			} else if (size === 'smallSlider') {
				return smallSlider.breakpoints
			}
		},
	},
}
</script>

<style lang="sass" scoped>
.slider__container
	max-width: 1200px
	padding-left: 10px
	padding-right: 10px
</style>