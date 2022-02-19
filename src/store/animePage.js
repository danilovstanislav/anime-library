import axios from 'axios'

export const animePage = {
  namespaced: true,

  state: () => ({
    currentAnime: null,
    charactersArray: [],
    reviewsArray: [],
    recommendationsArray: [],
    // seasonalArray: [],
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
    async getAnimeById({ commit }, id) {
      try {
        const animeById = await axios.get(`https://api.jikan.moe/v4/anime/${id}`)
        commit('setCurrentAnime', animeById.data.data)
      } catch (err) {
        console.error(err)
      }

      try {
        const characters = await axios.get(
          `https://api.jikan.moe/v4/anime/${id}/characters`
        )
        commit('setCharactersArray', characters.data.data)
      } catch (err) {
        console.error(err)
      }
      
      try {
        const reviews = await axios.get(
          `https://api.jikan.moe/v4/anime/${id}/reviews`
        )
        commit('setReviewsArray', reviews.data.data)
      } catch (err) {
        console.error(err)
      }
      
      try {
        const recommendations = await axios.get(
          `https://api.jikan.moe/v4/anime/${id}/recommendations`
        )
        commit('setRecommendationsArray', recommendations.data.data)
      } catch (err) {
        console.error(err)
      }
      window.scrollTo(0, 0)
    },

    // async getCharacters({ commit }, id) {
    //   try {
    //     const res = await axios.get(
    //       `https://api.jikan.moe/v4/anime/${id}/characters`
    //     )
    //     commit('setCharactersArray', res.data.data)
    //   } catch (err) {
    //     console.error(err)
    //   }
    // },

    // async getReviews({ commit }, id) {
    //   try {
    //     const res = await axios.get(
    //       `https://api.jikan.moe/v4/anime/${id}/reviews`
    //     )
    //     commit('setReviewsArray', res.data.data)
    //   } catch (err) {
    //     console.error(err)
    //   }
    // },

    // async getRecommendations({ commit }, id) {
    //   try {
    //     const res = await axios.get(
    //       `https://api.jikan.moe/v4/anime/${id}/recommendations`
    //     )
    //     commit('setRecommendationsArray', res.data.data)
    //   } catch (err) {
    //     console.error(err)
    //   }
    // },
  },
}
