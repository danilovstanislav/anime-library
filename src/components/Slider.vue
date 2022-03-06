<template>
	<swiper
		class="slider__container"
		:breakpoints="getSliderSize"
		:simulate-touch="true"
		:modules="modules"
		navigation
		:rewind="true"
	>
		<swiper-slide v-for="card in contentArr" :key="card.mal_id">
			<transition name="slider-card" appear>
				<slot :card="card" />
			</transition>
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
		contentArr: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			modules: [Navigation],
		}
	},
	computed: {
		getSliderSize() {
			const size = this.$attrs.sliderSize

			if (size === 'wide') {
				return wideSlider.breakpoints
			} else if (size === 'small') {
				return smallSlider.breakpoints
			}
		},
	},
}
</script>

<style lang="sass" scoped>
.slider__container
	max-width: $content-width

.slider-card-enter-from
	opactiy: 0
	transform: scale(0.7)

.slider-card-enter-to
	opactiy: 1
	transform: scale(1)

.slider-card-enter-active
	transition: all .4s ease
</style>