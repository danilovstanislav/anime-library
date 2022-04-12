import instance from '@/plugins/axios/axios'
import { ref } from 'vue'

const animeSearchParams = {
  sort: 'desc',
  order_by: 'score',
  min_score: 1,
}

const characterSearchParams = {
  sort: 'desc',
  order_by: 'favorites',
}

export function useSearchResults() {
  const lastSearch = ref('')
  const currentPage = ref(1)
  const hasNextPage = ref(false)
  const loading = ref(false)
  const error = ref(false)
  const searchedResults = ref([])
  const step = 2
  const searchParams = ref(null)

  async function getResults(inp, sel) {
    if (sel === 'anime') {
      searchParams.value = animeSearchParams
    } else if (sel === 'characters') {
      searchParams.value = characterSearchParams
    }

    try {
      loading.value = true
      for (let i = 0; i <= step; i++) {
        const res = await instance({
          methods: 'GET',
          url: sel,
          params: {
            q: inp ?? lastSearch.value,
            page: currentPage.value,
            ...searchParams.value,
          },
        })

        hasNextPage.value = res.data.pagination.has_next_page
        searchedResults.value = [...searchedResults.value, ...res.data.data]

        if (hasNextPage.value) {
          currentPage.value += 1
        } else break
      }
    } catch (err) {
      error.value = true
      console.error(err)
    } finally {
      loading.value = false
      sessionStorage.searchedResults = JSON.stringify(searchedResults.value)
      sessionStorage.lastSearch = lastSearch.value
      sessionStorage.selectedTypeCard = sel
    }
  }

  return {
    searchedResults,
    lastSearch,
    loading,
    error,
    getResults,
    currentPage,
  }
}
