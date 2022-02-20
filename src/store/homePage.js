import axios from 'axios'

export const homePage = {
  namespaced: true,

  state: () => ({
    topAnime: [],
    seasonNow: [],
    seasonUpcoming: [],
  }),

  mutations: {
    setTopAnime(state, payload) {
      state.topAnime = payload
    },
    setSeasonNow(state, payload) {
      state.seasonNow = payload
    },
    setSeasonUpcoming(state, payload) {
      state.seasonUpcoming = payload
    },
  },

  actions: {
    async getTopAnime({ state, commit }) {
      if (!state.topAnime.length) {
        try {
          const res = await axios.get('https://api.jikan.moe/v4/top/anime')
          commit('setTopAnime', res.data.data)
        } catch (err) {
          console.error(err)
        }
      }
    },

    async getSeasonNow({ state, commit }) {
      if (!state.seasonNow.length) {
        try {
          const res = await axios.get('https://api.jikan.moe/v4/seasons/now')
          commit('setSeasonNow', res.data.data)
        } catch (err) {
          console.error(err)
        }
      }
    },

    async getSeasonUpcoming({ state, commit }) {
      if (!state.seasonUpcoming.length) {
        try {
          const res = await axios.get(
            'https://api.jikan.moe/v4/seasons/upcoming'
          )
          commit('setSeasonUpcoming', res.data.data)
        } catch (err) {
          console.error(err)
        }
      }
    },
  },
}
