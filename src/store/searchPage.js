import axios from 'axios'

export const searchPage = {
  namespaced: true,

  state: () => ({
    searchParams: {
      sort: 'desc',
      order_by: 'score',
      min_score: 1,
    },
    lastSearch: '',
    searchedResults: [],
    hasNextPage: false,
    currentPage: 1,
    isWaitForResponse: false,
    resultsNotFound: false,
  }),

  mutations: {
    SET_SEARCHED_RESULTS(state, payload) {
      state.searchedResults = payload
    },

    SET_LAST_SEARCH(state, payload) {
      state.lastSearch = payload
    },

    SET_HAS_NEXT_PAGE(state, payload) {
      state.hasNextPage = payload
    },

    SET_CURRENT_PAGE(state, payload) {
      state.currentPage = payload
    },

    SET_IS_WAIT_FOR_RESPONSE(state, payload) {
      state.isWaitForResponse = payload
    },

    SET_RESULTS_NOT_FOUND(state, payload) {
      state.resultsNotFound = payload
    },
  },

  actions: {
    async getSearchResults({ state, commit }, inp, sel) {
      commit('SET_LAST_SEARCH', inp ?? state.lastSearch)
      commit('SET_IS_WAIT_FOR_RESPONSE', true)
      commit('SET_RESULTS_NOT_FOUND', false)
      let accumulateArray = []
      const step = 2
      console.log(sel)

      try {
        for (let i = 1; i <= step; i++) {
          console.log(sel)
          const res = await axios({
            methods: 'GET',
            url: `https://api.jikan.moe/v4/${sel}`,
            params: {
              q: state.lastSearch,
              page: state.currentPage,
              ...state.searchParams,
            },
          })
          commit('SET_HAS_NEXT_PAGE', res.data.pagination.has_next_page)
          accumulateArray = [...accumulateArray, ...res.data.data]
          if (state.hasNextPage) {
            commit('SET_CURRENT_PAGE', state.currentPage + 1)
          } else break
        }
      } catch (error) {
        console.error(error)
      } finally {
        commit('SET_IS_WAIT_FOR_RESPONSE', false)
      }

      if (state.searchedResults.length) {
        commit('SET_SEARCHED_RESULTS', [
          ...state.searchedResults,
          ...accumulateArray,
        ])
      } else {
        commit('SET_SEARCHED_RESULTS', [...accumulateArray])
      }

      state.searchedResults.length === 0
        ? commit('SET_RESULTS_NOT_FOUND', true)
        : commit('SET_RESULTS_NOT_FOUND', false)
    },

    async getInputDropdown({ state }, { inp, sel }) {
      if (inp === '') {
        return []
      }

      try {
        const res = await axios({
          methods: 'GET',
          url: `https://api.jikan.moe/v4/${sel}`,
          params: {
            q: inp,
            ...state.searchParams,
          },
        })
        console.log(res.data.data)
        return [...res.data.data]
      } catch (error) {
        console.error(error)
      }
    },

    clearResults({ commit }) {
      commit('SET_SEARCHED_RESULTS', [])
      commit('SET_LAST_SEARCH', '')
      commit('SET_HAS_NEXT_PAGE', false)
      commit('SET_CURRENT_PAGE', 1)
    },
  },
}
