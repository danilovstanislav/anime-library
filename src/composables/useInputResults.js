import instance from '@/plugins/axios/axios'
import { ref } from 'vue'
import _ from 'lodash'

const animeSearchParams = {
  sort: 'desc',
  order_by: 'score',
  min_score: 1,
}

const characterSearchParams = {
  sort: 'desc',
  order_by: 'favorites',
}

export function useInputResults() {
  const input = ref('')
  const selectedOption = ref('anime')
  const inputResultArray = ref([])
  const isDropdownOpen = ref(false)
  const loading = ref(false)
  const error = ref(false)
  const searchParams = ref(null)

  const updateInputResults = _.debounce(getInputResults, 1000)

  async function getInputResults() {
    if (input.value === '') {
      return
    }

    if (selectedOption.value === 'anime') {
      searchParams.value = animeSearchParams
    } else if (selectedOption.value === 'characters') {
      searchParams.value = characterSearchParams
    }

    try {
      const res = await instance({
        methods: 'GET',
        url: selectedOption.value,
        params: {
          q: input.value,
          page: 1,
          ...searchParams.value,
        },
      })
      inputResultArray.value = [...res.data.data]
    } catch (err) {
      error.value = true
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    updateInputResults,
    input,
    selectedOption,
    inputResultArray,
    isDropdownOpen,
  }
}
