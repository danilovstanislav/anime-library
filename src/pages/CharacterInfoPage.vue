<template>
	<h2 class="error" v-if="error">Something went wrong. Try reloading!</h2>
	<Suspense>
		<CharacterInfoPageItem />
		<template #fallback>
			<CharacterInfoPageLoading />
		</template>
	</Suspense>
</template>

<script>
import CharacterInfoPageItem from '@/components/CharacterInfoPageItem.vue'
import CharacterInfoPageLoading from '@/components/CharacterInfoPageLoading.vue'
import { ref, onErrorCaptured } from 'vue'

export default {
	components: {
		CharacterInfoPageItem,
		CharacterInfoPageLoading,
	},

	setup() {
		const error = ref(null)

		onErrorCaptured((e) => {
			error.value = e
		})

		return { error }
	},
}
</script>

<style lang="sass" scoped>
.container
	flex-grow: 1
</style>