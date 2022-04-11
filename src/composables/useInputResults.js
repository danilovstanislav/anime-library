import instance from '@/plugins/axios/axios'
import { ref } from 'vue'
import _ from 'lodash'

const searchParams = {
  sort: 'desc',
  order_by: 'score',
  min_score: 1,
}

export function useInputResults() {
  const input = ref('')
  const selectedOption = ref('anime')
  const inputResultArray = ref([])
  const isDropdownOpen = ref(false)

  const loading = ref(false)
  const error = ref(false)

  const updateInputResults = _.debounce(getInputResults, 1500)

  async function getInputResults() {
    if (input.value === '') {
      return
    }

    try {
      loading.value = true
      const res = await instance({
        methods: 'GET',
        url: selectedOption.value,
        params: {
          q: input.value,
          page: 1,
          ...searchParams,
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
