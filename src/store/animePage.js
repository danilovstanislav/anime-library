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

    async getCharacters({ commit }, id) {
      try {
        const res = await axios.get(
          `https://api.jikan.moe/v4/anime/${id}/characters`
        )
        commit('setCharactersArray', res.data.data)
      } catch (err) {
        console.error(err)
      }
    },

    async getReviews({ commit }, id) {
      try {
        const res = await axios.get(
          `https://api.jikan.moe/v4/anime/${id}/reviews`
        )
        commit('setReviewsArray', res.data.data)
      } catch (err) {
        console.error(err)
      }
    },

    async getRecommendations({ commit }, id) {
      try {
        const res = await axios.get(
          `https://api.jikan.moe/v4/anime/${id}/recommendations`
        )
        commit('setRecommendationsArray', res.data.data)
      } catch (err) {
        console.error(err)
      }
    },
  },
}
