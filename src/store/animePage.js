import axios from 'axios'

export const animePage = {
  namespaced: true,

  state: () => ({
    currentAnime: null,
    charactersArray: [],
    reviewsArray: [],
    recommendationsArray: [],
  }),

  mutations: {
    setCurrentAnime(state, payload) {
      state.currentAnime = payload
    },
    setCharactersArray(state, payload) {
      state.charactersArray = payload
    },
    setReviewsArray(state, payload) {
      state.reviewsArray = payload
    },
    setRecommendationsArray(state, payload) {
      state.recommendationsArray = payload
    },
  },

  actions: {
    async getAnimeById({ commit, dispatch }, id) {
      try {
        const res = await axios.get(`https://api.jikan.moe/v4/anime/${id}`)
        commit('setCurrentAnime', res.data.data)
        dispatch('getCharacters', id)
        dispatch('getReviews', id)
        dispatch('getRecommendations', id)
        window.scrollTo(0, 0)
      } catch (err) {
        console.error(err)
      }
    },

    async getCharacters({ state, commit }, id) {
      try {
        const res = await axios.get(
          `https://api.jikan.moe/v4/anime/${id}/characters`
        )
        commit('setCharactersArray', res.data.data)
      } catch (err) {
        state.charactersArray = []
        console.error(err)
      }
    },

    async getReviews({ state, commit }, id) {
      try {
        const res = await axios.get(
          `https://api.jikan.moe/v4/anime/${id}/reviews`
        )
        commit('setReviewsArray', res.data.data)
      } catch (err) {
        state.reviewsArray = []
        console.error(err)
      }
    },

    async getRecommendations({ state, commit }, id) {
      try {
        const res = await axios.get(
          `https://api.jikan.moe/v4/anime/${id}/recommendations`
        )
        commit('setRecommendationsArray', res.data.data)
      } catch (err) {
        state.recommendationsArray = []
        console.error(err)
      }
    },
  },
}
