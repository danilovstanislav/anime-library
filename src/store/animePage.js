import axios from 'axios'

export const animePage = {
  namespaced: true,

  state: () => ({
    isRequested: false,
    currentAnime: {},
    animeInfo: {
      animeImage: null,
      animeImageAlt: null,
      categories: [],
    },
    trailer: {},
    charactersArray: [],
    reviewsArray: [],
    recommendationsArray: [],
  }),

  mutations: {
    SET_IS_REQUESTED(state, payload) {
      state.isRequested = payload
    },

    SET_CURRENT_ANIME(state, payload) {
      state.currentAnime = payload
    },

    SET_ANIME_INFO(state, payload) {
      state.animeInfo.animeImage = payload.animeImage
      state.animeInfo.animeImageAlt = payload.animeImageAlt
      state.animeInfo.categories = payload.categories
    },

    SET_TRAILER(state, payload) {
      state.trailer.url = payload
    },

    SET_CHARACTERS_ARRAY(state, payload) {
      state.charactersArray = payload
    },

    SET_REVIEWS_ARRAY(state, payload) {
      state.reviewsArray = payload
    },

    SET_RECOMMENDATIONS_ARRAY(state, payload) {
      state.recommendationsArray = payload
    },
  },

  actions: {
    async getAnimeById({ state, commit, dispatch }, id) {
      commit('SET_IS_REQUESTED', true)
      try {
        const res = await axios.get(`https://api.jikan.moe/v4/anime/${id}`)
        commit('SET_CURRENT_ANIME', res.data.data)
        commit('SET_ANIME_INFO', {
          animeImage: state.currentAnime.images.jpg.large_image_url,
          animeImageAlt: state.currentAnime.title,
          categories: [
            { key: 'Type', value: state.currentAnime.type },
            { key: 'Episodes', value: state.currentAnime.episodes },
            { key: 'Status', value: state.currentAnime.status },
            { key: 'Premiered', value: state.currentAnime.aired.string },
            {
              key: 'Genres',
              value: state.currentAnime.genres
                .map((i) => i.name)
                .slice(0, 3)
                .join(' '),
            },
            { key: 'Duration', value: state.currentAnime.duration },
          ],
        })
        commit('SET_TRAILER', state.currentAnime.trailer.url)
        commit('SET_IS_REQUESTED', false)
        dispatch('getCharacters', id)
        dispatch('getReviews', id)
        dispatch('getRecommendations', id)
      } catch (err) {
        console.error(err)
      }
    },

    async getCharacters({ commit }, id) {
      try {
        const res = await axios.get(
          `https://api.jikan.moe/v4/anime/${id}/characters`
        )
        commit('SET_CHARACTERS_ARRAY', res.data.data)
      } catch (err) {
        commit('SET_CHARACTERS_ARRAY', [])
        console.error(err)
      }
    },

    async getReviews({ commit }, id) {
      try {
        const res = await axios.get(
          `https://api.jikan.moe/v4/anime/${id}/reviews`
        )
        commit('SET_REVIEWS_ARRAY', res.data.data)
      } catch (err) {
        commit('SET_REVIEWS_ARRAY', [])
        console.error(err)
      }
    },

    async getRecommendations({ commit }, id) {
      try {
        const res = await axios.get(
          `https://api.jikan.moe/v4/anime/${id}/recommendations`
        )
        commit('SET_RECOMMENDATIONS_ARRAY', res.data.data)
      } catch (err) {
        commit('SET_RECOMMENDATIONS_ARRAY', [])
        console.error(err)
      }
    },

    removeAllData({ commit }) {
      commit('SET_CURRENT_ANIME', {})
      commit('SET_ANIME_INFO', {
        animeImage: null,
        animeImageAlt: null,
        categories: [],
      })
      commit('SET_TRAILER', {})
      commit('SET_CHARACTERS_ARRAY', [])
      commit('SET_REVIEWS_ARRAY', [])
      commit('SET_RECOMMENDATIONS_ARRAY', [])
    },
  },
}
